// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const cfg = getDefaultConfig(__dirname);
const { withNativeWind } = require("nativewind/metro");


cfg.resolver.sourceExts = process.env.RN_SRC_EXT
  ? process.env.RN_SRC_EXT.split(",").concat(cfg.resolver.sourceExts)
  : cfg.resolver.sourceExts;

cfg.transformer.minifierPath = "metro-minify-terser";
cfg.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};

cfg.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
    nonInlinedRequires: [
      // We can remove this option and rely on the default after
      // https://github.com/facebook/metro/pull/1126 is released.
      "React",
      "react",
      "react/jsx-dev-runtime",
      "react/jsx-runtime",
      "react-native",
    ],
  },
});

module.exports = withNativeWind(cfg, { input: "./global.css" });
