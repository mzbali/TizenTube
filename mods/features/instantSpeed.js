// Shared by the userscript and the Android add-on asset. No menu navigation is needed.
(function () {
    if (window.ttInstantSpeed) return;
    let hideTimer;

    function rememberSpeed(speed) {
        // Use the upstream command handler so its in-memory config, settings menu,
        // localStorage and next-video canplay handler all see the same value.
        for (const key in (window._yttv || {})) {
            const instance = window._yttv[key] && window._yttv[key].instance;
            if (instance && typeof instance.resolveCommand === 'function') {
                instance.resolveCommand({
                    setClientSettingEndpoint: {
                        settingDatas: [{
                            clientSettingEnum: { item: 'videoSpeed' },
                            intValue: String(speed)
                        }]
                    }
                });
                return;
            }
        }
    }

    function showSpeed(speed) {
        let badge = document.getElementById('tt-instant-speed');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'tt-instant-speed';
            badge.setAttribute('role', 'status');
            badge.style.cssText = 'position:fixed;top:4vh;right:3vw;z-index:2147483647;' +
                'padding:.8vh 1.2vw;border-radius:.7vh;background:rgba(20,20,20,.85);' +
                'color:white;font:600 2.5vh sans-serif;pointer-events:none;';
            document.documentElement.appendChild(badge);
        }
        badge.textContent = speed + '\u00d7';
        badge.style.display = 'block';
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => { badge.style.display = 'none'; }, 1100);
    }

    window.ttInstantSpeed = {
        adjust(direction) {
            const video = document.querySelector('video');
            if (!video || video.readyState === 0) return;
            if (direction !== -1 && direction !== 1) return;
            const speed = Math.min(5, Math.max(.25,
                (Math.round(video.playbackRate * 4) + direction) / 4));
            video.playbackRate = speed;
            rememberSpeed(speed);
            showSpeed(speed);
        }
    };
})();
