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