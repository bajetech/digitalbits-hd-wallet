module.exports = (api) => {
  // Cache configuration is a required option.
  api.cache(false);

  const plugins = ["add-module-exports", ["@babel/transform-runtime", { regenerator: true }]];
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
      },
    ],
  ];

  return { presets, plugins };
};
