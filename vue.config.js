module.exports = {
  publicPath: '', // 用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  // outputDir: 'D:/web/busapp/www', // 输出文件夹路径，我这里设为www,主要是和Cordova配合生成安卓应用的。
  outputDir: '/Users/dixon/web/usc/app1/www', // 输出文件夹路径，我这里设为www,主要是和Cordova配合生成安卓应用的。
  productionSourceMap: false, // 不生成map
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/global.scss";',
      },
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 750,
            unitPrecision: 3,
            propList: [
              "*"
            ],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
          })
        ]
      }
    },
  },
  pwa: {
    name: 'My App',
    tcorhemeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      favicon32: 'img/icons/icon.png',
      favicon16: 'img/icons/icon.png',
      appleTouchIcon: 'img/icons/icon.png',
      maskIcon: 'img/icons/icon.png',
      msTileImage: 'img/icons/icon.png',
    },
  },
};
