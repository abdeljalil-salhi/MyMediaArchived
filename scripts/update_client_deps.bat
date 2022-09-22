@ECHO OFF
TITLE MyMedia Client [UPDATE DEPENDENCIES]
COLOR 07
CD ../client
CLEAR || CLS
npm install -g npm-check-updates
npm-check-updates -u
npm install