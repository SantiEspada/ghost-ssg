#!/bin/bash

# Forked from https://github.com/huangyuzhang/gui/ - Copyright (c) 2019 Simon
# See license at https://github.com/huangyuzhang/gui/blob/master/LICENSE

# Define urls and https
content_url=http://ghost:2368
from_url=$1
to_url=$2
repo_path=$3
folder=$4

# Go to repo path
cd ${repo_path}

# Reset to remote state
git clean -fd
git pull

# Remove current folder
rm -rf ${folder}

# Copy blog content
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/

# Copy 404 page
wget --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links --content-on-error --timestamping ${content_url}/404.html

# Copy sitemaps
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap.xsl
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap.xml
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap-pages.xml
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap-posts.xml
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap-authors.xml
wget --recursive --no-host-directories --directory-prefix=${folder} --adjust-extension --timeout=30 --no-parent --convert-links ${content_url}/sitemap-tags.xml

# Replace original domain with final one
LC_ALL=C find ./${folder} -type f -not -wholename *.git* -exec sed -i -e "s,${from_url},${to_url},g" {} +

# Commit and push the changes
timestamp=$(date -I"seconds")
git add ${folder}
git commit -m "${timestamp}"
git push -f
