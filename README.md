# VueJs boilerplate

## Project setup

### Copy environment variables to your local file and change accordingly

```
cp default.env .env
```

```
docker compose run --rm frontend npm i
docker compose run --rm frontend npx simple-git-hooks
```

## Usage

### Compiles and hot-reloads for development

```
docker compose up
```

### Compiles and minifies for production

```
docker build . -t vuejsboilerplate
```

If you'd like to test in localhost the build

```
docker run -d -p 8080:80 vuejsboilerplate
```

## Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

## To-Do

-   ~~Migrate to Typescript~~
-   ~~Migrate to VueJs 3~~
-   ~~Migrate to Vite~~
-   ~~Remove Axios~~
