
### Pre step
1. Make sure **gcloud** in the commandline
2. nodejs14

### Build
```
npm install --force

 ./node_modules/@angular/cli/bin/ng build --prod
```

### Upload
```
gcloud storage cp -r ./dist/appoinement-admin/browser/*  gs://www.sadisha.org/
```

### Enable web on GCS bucket
```
gsutil web set -m index.html -e 404.html gs://www.sadisha.org
```