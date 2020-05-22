FROM node:12.2.0-alpine as base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

FROM base as dev
RUN npm config list
RUN npm ci && \
    npm cache clean --force
#RUN npm install @vue/cli@3.7.0 -g 
CMD ["npm", "run", "serve"]

FROM base as build
COPY . .
RUN npm ci && \
    npm cache clean --force
RUN npm run build

FROM nginx:1.18-alpine as production
ENV NODE_ENV=production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# build environment
# FROM node:12.2.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent
# RUN npm install @vue/cli@3.7.0 -g
# COPY . /app
# RUN npm run build

# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
