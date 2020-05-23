FROM node:12.2.0-alpine as base
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

ARG VUE_APP_TITLE="VueJS Boilerplate"
ENV VUE_APP_TITLE ${VUE_APP_TITLE}

ARG VUE_APP_API_URL='/api'
ENV VUE_APP_API_URL $VUE_APP_API_URL
COPY . .
#RUN npm run build
RUN vue-cli-service build

FROM nginx:1.18-alpine as production
ENV NODE_ENV=production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Need to be tested
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget http://localhost/ -qO - > /dev/null 2>&1

CMD ["nginx", "-g", "daemon off;"]
