## 基础工具 (Base)

以下是常用的全局共用基础工具

### 分隔线

```html
<div class="kui-line-title"><span class="kui-line-txt">分隔标题</span></div>
<div class="kui-line-title"><span class="kui-line-txt"><i class="icon-dot"></i></span></div>
<div class="kui-line-title"><span class="kui-line-txt"><i class="icon-load"></i>正在加载</span></div>
```

### 状态文字

```html
<div class="kui-text-default">kui-text-default</div>
<div class="kui-text-primary">kui-text-primary</div>
<div class="kui-text-success">kui-text-success</div>
<div class="kui-text-danger">kui-text-danger</div>
<div class="kui-text-warning">kui-text-warning</div>
<div class="kui-text-node">kui-text-node</div>
```

### 状态背景

```html
<div class="kui-bg-default">kui-bg-default</div>
<div class="kui-bg-primary">kui-bg-primary</div>
<div class="kui-bg-success">kui-bg-success</div>
<div class="kui-bg-danger">kui-bg-danger</div>
<div class="kui-bg-warning">kui-bg-warning</div>
```

### 状态提示

```html
<div class="kui-tips-default">kui-tips-default</div>
<div class="kui-tips-primary Mt">kui-tips-primary</div>
<div class="kui-tips-success Mt">kui-tips-success</div>
<div class="kui-tips-warning Mt">kui-tips-warning</div>
<div class="kui-tips-danger Mt">kui-tips-danger</div>
```

### 红点

`kui-reddot`为红点，`kui-reddot-s`为小红点

```html
<span class="kui-reddot">红点标题</span>
<span class="kui-reddot-s">红点标题</span>
```

### 常用类

| 类名        | 说明                   |
| --------- | -------------------- |
| .cl       | 请除clear:both         |
| .aftcl    | 通过:after伪类clear:both |
| .overhide | 溢出隐藏                 |
| .fl       | 向左浮动float:left       |
| .fr       | 向左浮动float:right      |
| .rand     | 圆角0.5rem             |
| .unselect | 禁止选择                 |

以及内部边距和外边距，都是`0.5rem`,`Mg=margin:0.5rem`,`Ml=margin-left:0.5rem`

外边距：**Mg**,**Ml**,**Mr**,**Mt**,**Mb**,**Mtb**,**Mlr**

内边距：**Pg**,**Pl**,**Pr**,**Pt**,**Pb**,**Ptb**,**Plr**

## 文本样式 (Text)

### 基础文本

```html
<h1>标题一</h1><!--font-size:2rem-->
<h2>标题二</h2><!--font-size:1.5rem-->
<h3>标题三</h3><!--font-size:1.17rem-->
<h4>标题四</h4><!--font-size:1.6rem (body默认)-->
<h5>标题五</h5><!--font-size:0.83rem-->
<h6>标题六</h6><!--font-size:0.67rem-->
<p>这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落</p><!--font-size:1.6rem (body默认)-->
```

### 文本截断

```html
<!--单行截断-->
<div class="kui-text-row">日暮，青盖亭亭，情人不见，争忍凌波去？只恐舞衣寒易落，愁人西风南浦。高柳垂阴，老鱼吹浪，留我花间住。田田多少，几回沙际归路。</div>
<!--两行截断-->
<div class="kui-text-row2">日暮，青盖亭亭，情人不见，争忍凌波去？只恐舞衣寒易落，愁人西风南浦。高柳垂阴，老鱼吹浪，留我花间住。田田多少，几回沙际归路。</div>
<!--三行截断-->
<div class="kui-text-row3">日暮，青盖亭亭，情人不见，争忍凌波去？只恐舞衣寒易落，愁人西风南浦。高柳垂阴，老鱼吹浪，留我花间住。田田多少，几回沙际归路。</div>
```

## 布局 (Layout)

所有页面的外框都必需加外框：`kui-page`或`kui-page-fixed`。前者为内容高度自适应，头部底部通过flexd固定，适合做网页。后者为内容区固定，使用做APP型的页面。

层级和顺序

头部、底部、侧栏应该放在内容块之前，如下：

```js
+kui-page
	-kui-header				//头部
	-kui-header-secondary	//次头部
	-kui-footer-secondary	//次底部
	-kui-footer				//底部
	-kui-side				//侧栏
	-kui-content			//内容区
	-kui-page-mask			//遮罩层，参考js插件中kui.mask()方法
```

> 但注意，因为`kui-page-fixed`内容区固定，是通过`overflow:auto`来产生溢出滚动条，体验不好，推荐结合使用JS插件中的滚动组件

### 布局示例

```html
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
<!--左右侧栏-->
<div class="kui-side-left">左侧栏菜单</div>
<div class="kui-side-right">右侧栏菜单</div>
```

### 侧栏说明

为了提高效率，侧栏的打开和关闭都是由CSS效果完成。在`body`中添加`.open-side-left`样式，打开左边侧栏，添加`.open-side-right`样式则打开右边侧栏



## 删格系统 (Grid)

### float删格，适合多行

```html
<ul class="demo-block kui-row kui-1px-rb Mg">
  <li class="kui-col-50">50</li>
  <li class="kui-col-50">50</li>
  <li class="kui-col-25">25</li>
  <li class="kui-col-75">75</li>
  <li class="kui-col-33">33</li>
  <li class="kui-col-67">67</li>
  <li class="kui-col-20">20</li>
  <li class="kui-col-80">80</li>
  <li class="kui-col-10">10</li>
  <li class="kui-col-90">90</li>
</ul>
```

### Flex栅格

```html
<div class="kui-row-flex">
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
</div>
<div class="kui-row-flex">
  <div class="kui-col-2">2/3</div>
  <div class="kui-col-1">1/3</div>
</div>
<div class="kui-row-flex">
  <div class="kui-col-3">3/4</div>
  <div class="kui-col-1">1/4</div>
</div>
<div class="kui-row-flex">
  <div class="kui-col-4">4/5</div>
  <div class="kui-col-1">1/5</div>
</div>
<div class="kui-row-flex">
  <div class="kui-col-3">3/5</div>
  <div class="kui-col-2">2/5</div>
</div>
```

### Flex栅格(垂直)

```html
<div class="kui-row-flex kui-row-flex-ver" style="height:200px;">
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
  <div class="kui-col-1">平均分</div>
</div>
```

## 1px解决方案 (1px)

```html
<div class="kui-1px-t">kui-1px-t</div>
<div class="kui-1px-b">kui-1px-b</div>
<div class="kui-1px-l">kui-1px-l</div>
<div class="kui-1px-r">kui-1px-r</div>
<div class="kui-1px-tb">kui-1px-tb</div>
<div class="kui-1px-lr">kui-1px-lr</div>
<div class="kui-1px-lt">kui-1px-lt</div>
<div class="kui-1px-rb">kui-1px-rb</div>
<div class="kui-1px rand">kui-1px + rand</div>
```

## 图标 (icon)

图标分为`系统基础图标`和`扩展图标`两部分。图标的使用方式为：`icon-left`或将元素的字体设置为`kui-icon`然后输入其对应的代码，如：`&#xe800;`

具体请查看[Demo](http://kevinui.com/font/icon-sys/demo.html)中的图片部分