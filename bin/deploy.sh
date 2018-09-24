#!/usr/bin/env bash

set -e

BOLD=$(tput bold)
CYAN=$(tput setaf 6)
RESET=$(tput sgr0)
semver=(patch minor major)
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
  echo "${BOLD}Error: Must start deploy from ${CYAN}master!${RESET}"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "${BOLD}Repository is not clean, can't continue...${RESET}"
  exit 1
fi

echo ""
echo "${BOLD}Creating new branch...${RESET}"
echo ""
git checkout -b version-bump

echo ""
echo "${BOLD}Bumping new locales versions...${RESET}"
echo ""
node bin/bumpVersion.js "$1"

echo ""
echo "${BOLD}Commiting changes...${RESET}"
echo ""
git add .
git commit -am "Update locales versions"
git push --set-upstream origin version-bump

echo ""
echo "${BOLD}New branch was pushed, create a PR and done!${RESET}"
echo ""
