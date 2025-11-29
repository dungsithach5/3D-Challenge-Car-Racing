# 🚗🏁 Car Racing Boy — 3D-Challenge

Get ready to race! This lightweight 3D car demo built with Three.js shows off basic vehicle movement, simple physics, a scenic track, ambient audio and reactive HUD — with a fun, energetic vibe. 🎮✨

Features
---------
- 🕹️ Smooth driving controls (W/A/S/D or arrow keys) with drift feedback 🔥
- 🌲 Procedural environment: track, trees, rocks, and a reflective lake 🌊
- ⚙️ Lightweight physics integration (CANNON / Rapier optional)
- 🎨 Post-processing effects for a polished look
- 🎵 Background chiptune audio and simple HUD (speed, time, laps)

Quick Start (Windows)
---------
Requirements:
- 💻 Node.js >= 14 (only for a static server) or Python 3
- 🌐 Modern browser (Chrome / Edge / Firefox)

Steps:
1. Open project folder:
   - 📁 c:\Threejs\3D-Challenge\index.html
2. Start a local server from the project root (serve assets over HTTP):
   - npm: `npx http-server 3D-Challenge -c-1`
   - Python: `cd 3D-Challenge && python -m http.server 8080`
3. Open browser: http://localhost:8080
4. Click the Start button or interact with the page to enable audio (browsers block autoplay). 👆🔊

Controls (feel the speed!)
---------
- ▶️ Start engine: UI button `#start-btn`
- ⏩ Accelerate / Reverse: W / S (or Up / Down)
- ↩️ Steer: A / D (or Left / Right)
- 💨 Drift: Hold steering while at speed — drift indicator lights up
- 🧭 HUD: `#time-value`, `#speed-value`, `#lap-current`

Files & Main Components
---------  
- 📌 Entry: c:\Threejs\3D-Challenge\js\main.js (init)  
- 🖼️ Renderer: c:\Threejs\3D-Challenge\js\three-setup.js (setupThreeJS)  
- 🔬 Physics: c:\Threejs\3D-Challenge\js\physics.js (setupPhysicsWorld)  
- 🌍 World: track.js, trees.js, rocks.js, lake.js, animal.js  
- 🚘 Car & Controls: car.js, controls.js  
- 🎮 Game logic: gameLogic.js

Libraries & Assets
---------  
- 🛠️ Three.js (rendering)  
- ⚖️ Optional physics: CANNON / Rapier (check js/libs.js)  
- 🎶 Audio: ./assets/sounds/i-love-my-8-bit-game-console-301272.mp3  
- 🗂️ All textures/models: c:\Threejs\3D-Challenge\assets\

Play tips & small boosts
---------  
- 👆 Click anywhere to unlock audio and start the engine.  
- 🛠️ Lower post-processing or object count if FPS drops.  
- 🔍 Toggle debug overlays in `js/main.js` for performance profiling.

Troubleshooting
---------  
- ❗ If audio or models fail to load, ensure you served the folder over HTTP (file:// may fail due to CORS).  
- 🔇 Browser prevents autoplay: user interaction required.  
- 🐞 Check console (DevTools) for missing asset paths.

Credits
---------  
- Built with Three.js. See `js/libs.js` for full library list and licenses.  
- 📦 Assets located in the `assets/` folder — verify licenses before reuse.

Have fun — push the pedal and enjoy the drift! 🚀🏎️