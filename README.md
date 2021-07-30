# VueJs boilerplate

## Project setup

### Copy environment variables to your local file and change accordingly

```
cp default.env .env
```

```
docker-compose run server npm i
```

### Compiles and hot-reloads for development

```
docker-compose up
```

### Compiles and minifies for production

```
docker build . -t vuejsboilerplate
```

If you'd like to test in localhost the build

```
docker run -d -p 8080:80 vuejsboilerplate
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
