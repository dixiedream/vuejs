const { NODE_ENV, PUBLIC_PATH } = process.env;

module.exports = {
  publicPath: PUBLIC_PATH ?? "/",
  productionSourceMap: NODE_ENV !== "production",
};
