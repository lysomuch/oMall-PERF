一、使用dll打包抽取第三方js（DllPlugin DllReferencePlugin插件）


::: warning
随着项目增长，引入的第三方js也越来越大。webpack将第三方js默认打成一个包，导致该js文件越来越庞大，严重影响首屏加载 。
:::

1.创建抽取的文件对象

在项目根目录创建一个dll.config.js文件，配置需要抽取的第三方js，只是一个普通的js文件，可以修改成你想要的名字。

```javascript
module.exports = {
  library: {
    vue: ["vue", "vue-router", "vuex"],
    others: ["axios", "js-cookie", "blueimp-md5"],
    dplayer: ["dplayer"],
    cos: ["cos-js-sdk-v5"],
    vod: ["vod-js-sdk-v6"],
    distpicker: ["v-distpicker"]
  }
};
```
library对象中，键为抽取后的js名称，值为一个数组，配置你项目中需要抽取的第三方js。

键越多，抽取的js文件越多。值越多，抽取的文件越大。各位根据自己项目的实际情况平衡。


### 2.安装clean-webpack-plugin插件

使用 **clean-webpack-plugin** 清除之前冗余的dll文件

```sh
npm install --save-dev clean-webpack-plugin
```

### 3.使用DllPlugin

在项目根目录创建 **webpack.dll.conf.js** 文件, 内容如下：

```javascript
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { library } = require("./dll.config.js");

// dll文件存放的目录
const dllPath = "public/vendor";
module.exports = {
  // 入口文件
  entry: {
    ...library
  },
  // 输出文件
  output: {
    path: path.join(__dirname, dllPath),
    filename: "MyDll.[name].js",
    library: "[name]_[hash]"
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[hash]"
    })
  ]
};
```

### 4.在package.json添加打包信息

在根项目录中找到package.json文件，在script对象内添加"dll": "webpack -p --progress --config ./webpack.dll.conf.js"。
```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint",
  "build:test": "vue-cli-service build --mode test",
  "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
},
```


### 5.打包第三方js
运行npm命令
```sh
npm run dll
```

运行命令后可能遇到以下情况，输入yes回车。安装完后，重新运行一下命令。

![dll1](https://cdn.shadowmon.com/dll01.jpg)


接下来，我们可以看到，在public文件下，已经生成了我们想要的js，以及mainfest.json文件。

![dll2](https://cdn.shadowmon.com/dll02.jpg)

### 6.在webpack中配置DllReferencePlugin
使用该插件，遇到require 在manifest中存在的库，不会再打进包里，而是运行时到指明的dll库中找。
在webpack生产环境配置中，（如果是vue项目，在根目录添加 vue.config.js文件） 添加如下代码，二种配置二选一。

```javascript
// webpack配置：
const path = require("path");
const webpack = require("webpack");
const dllPath = "./public/vendor/";
const { library } = require("./dll.config.js");

plugins: [
  ...Object.keys(library).map(name => {
    return new webpack.DllReferencePlugin({
      context: ".",
       manifest: path.join(dllPath, `${name}-manifest.json`)
     });
   })
]
```

```javascript
// vue.config.js配置
const path = require("path");
const webpack = require("webpack");
const dllPath = "./public/vendor/";
const { library } = require("./dll.config.js");

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      let pluginsPro = [
        ...Object.keys(library).map(name => {
          return new webpack.DllReferencePlugin({
            context: ".",
            manifest: path.join(dllPath, `${name}-manifest.json`)
          });
        })
      ];
      config.plugins = config.plugins.concat(pluginsPro);
    }
  }
};
```

`path` 和 `webpack` 是默认的，不需要安装。
`dllPath` 是前面配置的第三方js的生成目录。
`library` 是前面配置的js文件对象。

因为 `DllReferencePlugin` 配置需要一个个的添加，太过频繁与重复，所以我抽取出了一个`dll.config.js`文件，使用循环读取的方式添加。

### 7.引入js

打开index.html文件，在body标签内底部位置加入我们生成的js。
```html
<script src="<%= BASE_URL %>vendor/MyDll.vue.js"></script>
<script src="<%= BASE_URL %>vendor/MyDll.others.js"></script>
<script src="<%= BASE_URL %>vendor/MyDll.dplayer.js"></script>
<script src="<%= BASE_URL %>vendor/MyDll.cos.js"></script>
<script src="<%= BASE_URL %>vendor/MyDll.vod.js"></script>
<script src="<%= BASE_URL %>vendor/MyDll.distpicker.js"></script>
```
文件路径中`<%= BASE_URL %>`为vue cli 3中读取根目录的写法，使用其他框架的请使用自己的写法。只要将js文字引入，并能有效读取到即可。

### 总结：

只要运行 npm run dll 命令打包一次即可，除非配置文件改变，需要再次打包第三方js，同时也需要修改在 index.html 中的引入文件。
