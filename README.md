# 借鉴

* 后端和App端 

  [im.js](https://github.com/im-js/im.js)

* PC端

  [chat-room](https://github.com/mly-zju/chat-room)

# 备注

* server

  依赖 redis + mysql ,  参考 server\app\config 下文件进行自定义安装和配置；

* app

  本版本是二次开发，将  mobx 替换成了  redux  

   react-native + redux + socket.io

* web

  同样是二次开发，借用样式和部分功能，使用 redux 进行重新逻辑和交互；

# 开发

* 开发调试时 ，需要 进行端口映射 

  ` adb reverse tcp:7078 tcp:7078 `

  否则 app 不能正常访问和连接；

* UiLibrary 组件库 部分组件重写，按照es6语法和最新版本RN（0.62），其中舍弃了Navigator 导航，替换为官方推荐 react-navigation 作为路由模块。

* 去掉 了 appMode 支持 

# 效果

![效果图](.\screenshots\ios-demo-v1.4.1.gif)

此效果图为 Im.js 效果，由于是二开，部分效果没有实现。其他内容请自行浏览。