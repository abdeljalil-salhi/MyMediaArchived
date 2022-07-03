@ECHO OFF
TITLE MyMedia @abdeljalil-salhi
COLOR 07
:RESTART
CLEAR || CLS
ECHO ================================================
ECHO /                MyMedia Merge                 \
ECHO ================================================
git merge main
git checkout main
git pull
git merge --no-ff dev
git push -u origin main
ECHO ================================================
ECHO merged: main
ECHO ================================================
git checkout dev
git pull origin main
ECHO ================================================
PAUSE
CLEAR || CLS