# prepare state
FROM node:12-alpine as prepare-stage
ENV HOST "0.0.0.0"
ENV PORT 80
ENV API_BASE_PATH "/api"
WORKDIR /app
COPY package*.json ./

# dev stage
FROM prepare-stage as dev-stage
ENV NODE_ENV=development
ENV PORT 8080
EXPOSE 8080
CMD [ "npm", "run", "dev" ]

FROM prepare-stage as test-stage
ENV NODE_ENV=testing
RUN npm ci && \
  npm cache clean --force
# Unit tests
RUN jest --config test/unit/jest.conf.js --coverage
# Run with compose
CMD [ "node", "test/e2e/runner.js" ]

# build stage
FROM prepare-stage as build-stage
COPY . .
RUN npm config list
RUN npm ci && \
  npm cache clean --force && \
  node build/build.js --report

# production stage
FROM nginx:1.18-alpine as production-stage
ENV NODE_ENV=production
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]