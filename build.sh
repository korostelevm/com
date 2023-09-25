export NODE_OPTIONS=--openssl-legacy-provider
npx vue-cli-service build
rm -rf ./api/public
mv dist ./api/public
cd api && npm install