module.exports = (api) => {
  // Cache configuration is a required option.
  api.cache(false);

  const plugins = ["add-module-exports"];
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
