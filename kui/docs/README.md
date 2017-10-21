

# Quick Start

欢迎大家使用KUI库，本UI轻巧、优雅、可定制bulabula...(此处省略三千字)，请大家花认真阅读文档，以便更快掌握KUI的精髓，Good luck!

## 1.目录结构

```html
+demo			示例
+dist			发布的文件
+doc			文档
+font			图标字体
	+icon-ext	扩展图标字体
	+icon-sys	系统默认图标字体
+lib			第三方框架文件
	+zepto		zepto框架
+src			KUI框架源码
	+js			KUI的JS源码
	+less		KUI的Less源码
```

## 2. 引用静态资源

请按照下面方式引入框架文件。

```html
<link rel="stylesheet" href="dist/kui.min.css">
<!--建议将下面引用放到</body>之前-->
<script type='text/javascript' src='lib/zepto/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='dist/kui.min.js' charset='utf-8'></script>
```

> 如果调试阶段，建议去掉**.min.**可调用未压缩的版本

## 3.页面模板代码

你可以直接用下面的模板来创建你的页面。更详细的，请参考[布局](/base/#布局)

示例代码：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>KUI - Demo</title>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!--引入KUI框架样式文件-->
<link rel="stylesheet" href="dist/kui.min.css">
</head>
<body>
<div class="kui-page">
	<header class="kui-header">
		<div class="pull-left icon-left app-back">返回</div>
		<h1 class="kui-title">页面标题</h1>
		<div class="pull-right icon-menu">按扭</div>
	</header>
	<div class="kui-header-secondary">secondary</div>
	<div class="kui-footer-secondary">secondary</div>
	<div class="kui-footer">footer</div>
	<div class="kui-content">
		这里是您的HTML代码
	</div>
</div>
<!--
在body中添加.open-side-left或.open-side-right
打开
-->
<div class="kui-side-left">左侧栏菜单</div>
<div class="kui-side-right">右侧栏菜单</div>
  
<!--引入KUI框架js文件-->
<script type="text/javascript" src="lib/zepto/zepto.min.js" charset="utf-8"></script>
<script type="text/javascript" src="dist/kui.min.js" charset="utf-8"></script>
</body>
</html>
```

# 打包环境

本打包环境采用Grunt，环境安装方法点击连接http://www.gruntjs.net/ 自行学习，本文档不再复述。

!> 特别说明：如果您不想对本框架进行二次开发，您也可以只同步**dist/**目录选择一个已经打包好的版本进行使用！

## 1.Grunt插件安装

本项目使用到的插件有：grunt-contrib-jshint（js语法检查）、grunt-contrib-concat（合并）、grunt-contrib-uglify（采用UglifyJS压缩js）、grunt-contrib-less（编译Less）、grunt-contrib-cssmin（Css压缩合并），以下是安装方法。

安装Grunt

```
npm install grunt
```

安装合并插件

```html
npm install grunt-contrib-concat
```

安装JS语法检查

```
npm install grunt-contrib-jshint
```

安装JS压缩

```
npm install grunt-contrib-uglify
```

安装Less编译

```
npm install grunt-contrib-less
```

安装CSS压缩

```
npm install grunt-contrib-cssmin
```



# CSS命名规范

为了方便大家编写出统一的CSS，请参考以下命名规则。统一使用kui缀作为命名空间。class 名称中只能出现小写字符和破折号。例如`.kui-btn` 和 `.kui-btn-danger`。

命名应该简量简洁，重要元素或有特定含义的样式用全称，其他子集元素用简称。如页面标题用`kui-title`，而列表标题`kui-list-tit`。class 名称应当尽可能短，并且意义明确。

模块名如果是两个单词组合使用简单*连写*的方式，如kui-tooltips而不是kui-tool-tips。

`.kui-btn-lg.disabled`

{命名空间}-{模块}-{属性}.{状态}

`kui-dialog-cnt`

{命名空间}-{模块}-{子模块}

描述属性的class应该基于当前的class，层级不超过3级

`kui-list-item kui-list-item-tit`

{命名空间}-{模块}-{属性}.{状态}

>  注意，除了常用状态的class，不能直接使用其他不带前缀的class

## 1.状态类

| 单词       | 意思     |
| -------- | ------ |
| show     | 显示     |
| hide     | 隐藏     |
| current  | 当前状态   |
| active   | 激活态    |
| checked  | 选中态    |
| selected | 已选中状态  |
| disabled | 失效状态   |
| done     | 完成状态   |
| focus    | 聚集状态   |
| blur     | 失去焦点状态 |

## 2.约定的一些简写

| 缩写     | 原单词        |
| ------ | ---------- |
| -s     | small      |
| -lg    | large      |
| -l     | left       |
| -r     | right      |
| -t     | top        |
| -b     | bottom     |
| -thumb | thumbnail  |
| -img   | images     |
| -nav   | navigation |
| -cnt   | content    |
| -tit   | title      |
| -pg    | page       |
| -hd    | header     |
| -bd    | body       |
| -ft    | footer     |
| -txt   | text       |
| -btn   | button     |
| -multi | 多个         |
| -info  | 信息内容       |