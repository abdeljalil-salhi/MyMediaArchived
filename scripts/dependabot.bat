CD ../.github/scripts

POWERSHELL -executionpolicy ByPass -File ./update-dependabot.ps1 -targetBranch component-updates -outputFile ../dependabot.yml