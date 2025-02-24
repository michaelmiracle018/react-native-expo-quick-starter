/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ["en", "fr"],
    sourceLocale: "en",
    catalogs: [
      {
        path: "<rootDir>/src/languages/locale/locales/{locale}/messages",
        include: ["src"],
      },
    ],
    format: "po",
  };