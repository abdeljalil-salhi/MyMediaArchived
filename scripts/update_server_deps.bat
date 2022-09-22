@ECHO OFF
TITLE MyMedia Server [UPDATE DEPENDENCIES]
COLOR 07
CD ../server
CLEAR || CLS
npm install -g npm-check-updates
npm-check-updates -u
npm install