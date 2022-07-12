@ECHO OFF
TITLE MyMedia Client [AUDIT]
COLOR 07
CD ../client
CLEAR || CLS
npm audit --production && PAUSE