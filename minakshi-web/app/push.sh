#!/bin/sh

echo "Deploying code to remote server"
# Removed the '*' and added the '--delete' flag
rsync -aP --delete ./ minakshidewan@minakshidewan.com:public_html
echo "Code Deployed successfully"
