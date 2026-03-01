#!/bin/sh

echo "Deploying code to remote server"
rsync -aP ./* minakshidewan@minakshidewan.com:public_html
echo "Code Deployed successfully"