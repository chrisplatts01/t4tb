#! /bin/sh
sudo rm -R .tmp/
sudo rm -R dist
gulp;
node dev-menu > app/templates/includes/dev-menu.njk;
gulp serve;
