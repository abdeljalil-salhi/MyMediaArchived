@ECHO OFF
TITLE MyMedia @abdeljalil-salhi
COLOR 07
:RESTART
CLEAR || CLS
ECHO ======================================================
ECHO /                   MyMedia Commit                   \
ECHO ======================================================
SET /P message="$ ~>"
IF "%message%"=="" GOTO RESTART
ECHO ======================================================
git checkout dev
git add .
git commit -m "%message%"
git pull https://github.com/abdeljalil-salhi/MyMedia.git
git push all
ECHO ======================================================
ECHO commited: %message%
PAUSE
CLEAR || CLS