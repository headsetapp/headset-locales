#!/usr/bin/env bash

set -e

BOLD=$(tput bold)
CYAN=$(tput setaf 6)
RESET=$(tput sgr0)
semver=(patch minor major)
newBranch=false
branch=$(git symbolic-ref --short -q HEAD)

if [ "$#" -ne 1 ]; then
  echo "${BOLD}Illegal number of parameter. Only needs type of version bump: ${CYAN}${semver[*]}${RESET}"
  exit 1;
fi

# shellcheck disable=SC2076
if [[ ! " ${semver[*]} " =~ " $1 " ]]; then
  echo "${BOLD}Parameter needs to be one of: ${CYAN}${semver[*]}${RESET}"
  exit 1;
fi

if [ "$branch" == "master" ]; then
  echo "${BOLD}Error: Must NOT deploy from ${CYAN}master!${RESET}"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "${BOLD}Repository is not clean, can't continue...${RESET}"
  exit 1
fi

# Function to ask user yes/no question, with 3 tries before exiting
function confirm {
  local tries=1
  while [ $tries -le 3 ]; do
    read -n1 -rp "$1 [y/n] " choice; echo
    case $choice in
      y|Y ) return 0 ;;
      n|N ) return 1 ;;
    esac
    tries=$((tries + 1))
    echo "Wrong answer. Accepted answers are y,Y,n,N"
  done
  if [[ $tries -gt 3 ]]; then
    echo "${RED}Three wrong attempts, exiting...${RESET}"
    exit 5
  fi
}

echo ""
echo "${BOLD}Creating new branch...${RESET}"
echo ""
if confirm "Do you want to create a new branch named ${BOLD}version-bump${RESET}?"; then
  git checkout -b version-bump
  newBranch=true
fi

echo ""
echo "${BOLD}Bumping new locales versions...${RESET}"
echo ""
node bin/bumpVersion.js "$1"

echo ""
echo "${BOLD}Committing changes...${RESET}"
echo ""
git add .
git commit -am "Update locales versions"

echo ""
if [ $newBranch = "true" ]; then
  git push --set-upstream origin version-bump
  echo "${BOLD}New branch was pushed, create a PR and done!${RESET}"
else
echo "${BOLD}New commit created, submit a PR and done!${RESET}"
fi
echo ""
