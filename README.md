# fed-e-task-02-02 简答题答案

# Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

## 答：

1. 运webpack 命令，指定配置文件（默认为 webpack.config.js）

2. 根据配置文件中的 entry 节点，找到打包的入口文件

3. 从入口文件开始找加载的模块，并且根据配置中的 module.rules 节点中配置的相应类型的文件对应的加载器，对模块文件进行编译加载；如果对一个文件类型配置了多个加载器，则加载器的执行顺序是从后向前执行；webpack模块加载方式：

- 遵循 ES Modules 标准的 import 声明

- 遵循 CommonJS 标准的 require 函数

- 遵循 AMD 标准的 define 函数和 require 函数

- 样式代码中的 @import 指令和 url 函数

- HTML 代码中图片标签的src属性

4. 每个模块分配一个id，并且对已经加载的模块进行缓存

5. 把打包结果输出到 output节点配置的目标文件

6. 在构建流程的各个阶段会执行被挂载的plugin

# 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

## 答：

Loader 专注实现资源模块加载；Plugin 解决项目中的其他自动化工作，例如清除dist目录、拷贝静态文件至输出目录、压缩输出代码等。

- Loader 开发思路：
 
loader 是一个函数，该函数的入参是加载到的资源文件的内容，返回值是加工后的结果；

由于返回值会输出到目标bunder文件，所以需要保证最终返回值是一段标准的javascript代码保证目标文件的语法正确

- Plugin 开发思路：

Plugin 通过钩子机制实现；

plugin 是一个函数或者是一个包含 apply 方法的对象；

apply 方法会在 webpack 启动时自动调用；apply 接收一个 compiler 对象入参，compiler 对象包含webpack 所有的配置信息，通过该对象来挂载钩子函数；

挂载方式：

```
compiler.hooks.someHook.tap('MyPlugin', (compilation) => {
  /* ... */
});
```

第一个参数是 plugin 的名字，第二个参数是钩子函数；钩子函数入参 compilation 是此次打包的上下文；

通过 compilation.assets 可以获取打包的资源信息；通过 `complation.assets[oneAssetName].source()` 获取资源内容；

通过对资源内容的修改，并且把修改结果覆盖到资源对象上，来实现对打包结果的修改





