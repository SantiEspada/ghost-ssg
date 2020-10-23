#!/bin/bash

repo_url=$1
email=$2
folder=$3

# Setup Git name and email for commits
git config --global user.name "Ghost SSG Bot"
git config --global user.email "${email}"

# Clone the project
git clone ${repo_url} ${folder}

# Make sure we can push
cd ${folder}
git push
