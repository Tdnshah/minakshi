#!/bin/sh

echo "Deploying code to remote server"
# Removed the '*' and added the '--delete' flag
rsync -aP --delete ./ minakshidewan@167.86.105.50:public_html
echo "Code Deployed successfully"
