export NODE_OPTIONS=--openssl-legacy-provider
npx vue-cli-service build

mv dist ./api/public