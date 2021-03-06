module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
    $vm: false
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};
