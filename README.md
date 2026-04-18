# educampus
Here are the steps to run EduCampus locally in your VS Code terminal:

Prerequisites
Install these first if you haven't:

Node.js (v18+) — https://nodejs.org
DFX (DFINITY SDK) — run this in terminal:
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
Steps
1. Clone your repo

git clone https://github.com/b1safiya/educampus.git
cd educampus
2. Install frontend dependencies

cd src/frontend
npm install
cd ../..
3. Start the local Internet Computer replica

dfx start --background
4. Deploy canisters locally

dfx deploy
5. Open the app After deploy, DFX will print a local URL like:

http://127.0.0.1:4943/?canisterId=<your-canister-id>
Open that in your browser.

Common Issues
dfx not found — restart VS Code terminal after installing DFX so the PATH updates.
Port already in use — run dfx stop then dfx start --background again.
Node version mismatch — use nvm to switch to Node 18+.
