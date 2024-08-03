npm init -y
npm install -D typescript
npm install concurrently

tsc --init

Add the following scripts in package.json
{
"build": "npx tsc",
"watch": "npx tsc -w",
"prestart": "npm run build",
"start": "npx nodemon dist/index.js",
"dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
}

Note: Make relevant config changes in tsconfig.json

npm run dev
