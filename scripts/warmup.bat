@ECHO OFF
TITLE MyMedia Socket Admin Warm-Up [DEV]
COLOR 07
CD ../s-admin/test
CLEAR || CLS
npx artillery run basic-test.yaml