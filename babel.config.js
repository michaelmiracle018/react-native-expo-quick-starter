module.exports = function (api) {
  api.cache(true)
  // const isTestEnv = process.env.NODE_ENV === 'test'

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: "nativewind",
          lazyImports: true,
          native: {
            // We should be able to remove this after upgrading Expo
            // to a version that includes https://github.com/expo/expo/pull/24672.
            unstable_transformProfile: 'hermes-stable',
            // Disable ESM -> CJS compilation because Metro takes care of it.
            // However, we need it in Jest tests since those run without Metro.
            disableImportExportTransform: false,
          },
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '~': './src',
            lib: './src/lib',
            platform: './src/platform',
            state: './src/state',
            screens: './src/screens',
            crypto: './src/platform/crypto.ts',
            components: './src/components',
            reactQuery: './src/reactQuery',
            constants: './src/constants',
            fontAwesomeIcons: './src/fontAwesomeIcons',
            shared: './src/shared',
            utils: './src/utils',
            api: './src/api',
            reduxStore: './src/reduxStore',
            services: './src/services',
            hooks: './src/hooks',

          },
        },
      ],
      'macros',
      'react-native-reanimated/plugin', // NOTE: this plugin MUST be last
    ],
    env: {
      production: {
        plugins: [
          'transform-remove-console',
          '@babel/plugin-transform-modules-commonjs',
        ],
      },
    },
  }
}
