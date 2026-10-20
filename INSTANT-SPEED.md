# Instant remote speed controls

Branch `tv-speed-controls` adds `mods/features/instantSpeed.js`. It is imported
by the normal userscript and is also bundled as a standalone asset by the
Android add-on in `mzbali/TizenTubeCobalt/custom-build`.

The native bridge calls `window.ttInstantSpeed.adjust(-1)` for YouTube and
`adjust(1)` for Netflix. Each press changes the actual video playback rate by
0.25x, clamped to 0.25x–2x, saves through the existing TizenTube command handler,
and shows an unobtrusive 1.1-second corner badge. It does not pause playback,
move focus, open menus, or depend on a network request per press.

The module installs idempotently so the Android activity can safely evaluate it
on demand, including after page reloads. Unsupported commands and absent videos
are ignored. The normal speed menu remains available.

Keep `upstream` pointing at reisxd/TizenTube. Review and merge upstream changes
onto this branch periodically; check the command handler and video element
contract whenever updating the Android APK.
