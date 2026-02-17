
### Pre step
1. Make sure **gcloud** in the commandline
2. nodejs14

### Build
```
npm install --force

 ./node_modules/@angular/cli/bin/ng build --prod
```

### Upload - This is to upload to GCS ( backup option )
```
gcloud storage cp -r ./dist/appoinement-admin/browser/*  gs://www.sadisha.org/
```
### Upload to GH Pages
1. https://github.com/gopi6sigma/gopi6sigma.github.io make a clone of this repo
2. cp -r ./dist/appoinement-admin/browser/* ./ -> Run this command in gopi6sigma.github.io dir 

### Enable web on GCS bucket
```
gsutil web set -m index.html -e 404.html gs://www.sadisha.org
```

### Refer Angular routing for github pages to stop getting 404 error
https://v17.angular.io/guide/deployment#server-configuration
refer commit: https://github.com/gopi6sigma/gopi6sigma.github.io/commit/8f6071535f429555deb91145b356761be7558553

Note: Also make sure always to copy index.html into 404.html