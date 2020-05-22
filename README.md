# VueJs boilerplate

## Build Setup

``` bash
# install dependencies
docker-compose server npm i

# serve with hot reload at localhost:8080
docker-compose up

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# You can run the following command to let eslint fix any errors it finds (if it can - not all errors are fixable like this):
npm run lint -- --fix

# run all tests
docker-compose -f docker-compose.test.yml up

```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).