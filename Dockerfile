FROM node:lts-alpine as base

ENV TZ Europe/Rome
RUN apk update && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo "${TZ}" > /etc/timezone && \
    apk del tzdata

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install @vue/cli -g
COPY package*.json ./
RUN npm config list
RUN npm ci && \
    npm cache clean --force

FROM base as dev
EXPOSE 8080
CMD ["vue-cli-service", "serve" ]

FROM base as build

ARG PUBLIC_PATH="/"
ENV PUBLIC_PATH ${PUBLIC_PATH}

ARG VUE_APP_TITLE="VueJS Boilerplate"
ENV VUE_APP_TITLE ${VUE_APP_TITLE}

ARG VUE_APP_API_URL='/api'
ENV VUE_APP_API_URL $VUE_APP_API_URL

ARG VUE_APP_GTM="GTM-yourGTM"
ENV VUE_APP_GTM ${VUE_APP_GTM}

COPY . .
RUN vue-cli-service build

FROM build as test
ENV NODE_ENV=testing
RUN vue-cli-service lint

FROM build AS audit
USER root
RUN npm audit --audit-level critical
COPY --from=aquasec/trivy:latest /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy filesystem --no-progress /

FROM nginx:stable-alpine as production
ENV NODE_ENV=production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /etc/localtime /etc/localtime
COPY --from=build /etc/timezone /etc/timezone
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget http://localhost/ -qO - > /dev/null 2>&1

CMD ["nginx", "-g", "daemon off;"]
