# 关于Kui.js

`kui.js`为Kui的核心库，专为移动开发，其依赖`Zepto.js`，封装了常用的变量和方法。

## 基础功能(Kui.js)

**框架基本参数**

| 属性           | 说明                                       |
| ------------ | ---------------------------------------- |
| kui.version  | 当前UI版本                                   |
| kui.ua       | UserAgent                                |
| kui.device   | 设备信息，返回：`{os:'系统名',name:'设置名',version:'系统版本'}` |
| kui.isWeixin | 是否微信                                     |
| kui.appback  | `Function`类型，点击返回按扭时执行，默认`history.back()` |



### 获取地址栏参数

`kui.Get('name')` 获取地址栏参数；`kui.Get('#name')`可获取hash参数

### 数据缓存

本缓存功能是通过重新封装**localStorage**实现，实现可以直接存取**JSON**、**Array**数据以及设置过期时间。

`kui.cache(name,value,time)`读取、写入缓存

| 参数    | 类型           | 说明                   |
| ----- | ------------ | -------------------- |
| name  | string       | 必填                   |
| title | str/json/arr | 缓存内容，为空则输出名称所对应的缓存值。 |
| time  | Number       | 有效期（小时），默认6小时        |

>  `kui.removeCache(name) `删除指定缓存，如果name为空，则清除所有用kui.cache写入的缓存

### Cookie操作

kui.addCookie(name, value, day, path)

| 参数    | 类型     | 说明         |
| ----- | ------ | ---------- |
| name  | string | Cookie名    |
| value | string | Cookie值    |
| day   | number | 有效期，默认30天  |
| path  | string | 有效路径，默认根目录 |

> `kui.getCookie(name) ` 读取Cookie
>
> `kui.delCookie(name)` 删除Cookie

### Zepto扩展

文件`zepto-adapter.js`的功能。

**全局函数**

| 属性                      | 说明                        |
| ----------------------- | ------------------------- |
| $.support               | 是否触摸设备                    |
| $.touchEvents           | 根据设备，返回start、move、end的事件名 |
| $.getTranslate          | 获取变形参数                    |
| $.requestAnimationFrame | 动画帧请求回调函数列表               |
| $.cancelAnimationFrame  | 取消先前安排的一个动画帧更新的请求         |
| $.getScript             | 同于jQuery的$.getScript      |

**扩展对象**

| 属性               | 说明                    |
| ---------------- | --------------------- |
| .dataset()       | 获取元素中所有`data-*`返回json |
| .data()          |                       |
| .animationEnd()  |                       |
| .transitionEnd() |                       |
| .transition()    |                       |
| .transform()     | 动画                    |
| .prevAll()       | 元素之前对象集合              |
| .nextAll()       | 元素之后对象集合              |

### 

## 核心弹层插件(Layer)

`alert`、`actions`、`toast`、`loading`、`tabpage`等都是基于核心层Layer。在显示、隐藏、设置等，都可以直接继承layer的参数、方法和事件。包括`picker`、`日历`等插件都依赖layer

> 下面的CSS样式都支持{color:'#F00'}和'color:#F00'两种形式

### 参数

| 参数         | 类型       | 说明                                       |
| ---------- | -------- | ---------------------------------------- |
| id         | string   | 弹层ID，有唯一性                                |
| type       | string   | 弹层类型，方便控制层，如关闭某一类型的层                     |
| head       | auto     | 层头部，值为HTML或{title:'标题',className:'样式名',style:'头部样式',btn:[{text:'按扭名',icon:'按扭样式',onClick:function(){},isclose:是否关闭层}]} |
| content    | auto     | 内容 ，内容格式`HTML`或`['内容','CSS样式']`，参考下面说明   |
| footer     | auto     | 脚注 ，内容格式`HTML`或`['内容','CSS样式']`，参考下面说明   |
| side       | auto     | 侧栏，内容格式`HTML`或`['内容','CSS样式']`，参考下面说明。给层添加`open-side`即可打开侧栏。 |
| skin       | string   | 自定义层样式(皮肤)名                              |
| size       | array    | 层尺寸`['宽','高']`，如：['300px','250px']或['80%','50%'] |
| style      | css      | 自定义CSS样式，如：{color:'#F00'}，或'color:#F00'  |
| anim       | "fade"   | 入场效果，如：`left`/`right`/`top`/`bottom`/`fade`/`zoom`，也可以输入自定义效果，格式如：[{初始CSS},{入场动画},{出场动画},time] |
| autoshow   | true     | 是否自动显示，如果否，则需要用`obj.open()`方法去显示         |
| shade      | true     | 是否显示遮罩层，也可以写遮罩层的css样式                    |
| shadeclose | true     | 点击遮罩层是否关闭                                |
| timeout    | 0        | 秒，定时关闭遮罩层                                |
| scroller   | false    | 是否启用JS滚动，API参考scroller。下方有例子。            |
| onshow     | function | 当显示后回调函数                                 |
| onclose    | function | 当关闭后回调函数                                 |

> 技巧：`content`/`footer`/`side`参数在数组格式下，css值可以是`{background:'#FFF'}`或`'background:#FFF'`，也可以是：`'back-red'`给元素添加一个class类，多个类用空格隔开。

**创建层示例代码：**

```javascript
//创建层
var mylayer=$.layer({content:'最简单的层',size:['200px','150px']});
//创建一个带头、底部的层
$.layer({head:'头部',content:'最简单的层',foot:'底部',size:['200px','150px']});
//创建一个子页面
var mypage=$.layer({
  //头部
  head:{title:'层标题',
        btn:[
          	{text:'返回',icon:'icon-left'},
            {text:'菜单',icon:'icon-menu fr',siclose:false,
             	onClick:function(){
              		console.log('点击菜单事件')
            	}
            }
        ]
       
       },
  //内容
  content:'最简单的层',
  //大小
  size:['100%','100%'],	//用skin:'kui-layer-page'也行
  //入场动画
  anim:'right',
  //层样式,也可以写为style:'border-radius:5px'
  style:{'border-radius':'5px'},
  //事件回调
  onshow:function(){
    //当层显示后出发
  }
});

//当层设置了autoshow=false时，或层被关闭后，可以用以下方法让他显示
mylayer.open();
```

**层滚动设置**

```javascript
//创建一个内容滚动的层
var mylayer=$.layer({content:'最简单的层',size:['200px','150px'],scroller:true});
/************************************
 *滚动层方法
 *refresh,scrollTo,disable,enable,destroy,scale,call
************************************/
//刷新当前层滚动对象
mylayer.refresh();
//滚动到指定位置
mylayer.scrollTo(0,-200);
/************************************
 *滚动层事件
 *scrollStart,scroll,scrollEnd,touchEnd,zoomStart,zoomEnd,refresh
************************************/
mylayer.on('scrollStart',function(){
	//滚动开始啦
})

```

### 方法

**显示一个层**

```javascript
//myLayer为层对象,可传入回调函数
mylayer.open(callback);

//myLayer为层对象，或层ID，序号码
$.layer.open(mylayer);
```

**关闭一个层**

```javascript
//方法一 callback留空
mylayer.close(callback);

//方法二 mylayer可以是层对象、ID、层的索引ID
$.layer.close(mylayer);

//方法三
$.layer.close('all')    //关闭所有层

//方法四，给层内的某元素添加“kui-layer-close”
//方法五，如果没有设置shadeclose=flase点击遮罩也可以关闭。
```

**事件监听**

```javascript
//监听显示事件
mylayer.on('show',function(){
    console.log('层显示了');
})
//监听关闭事件
mylayer.on('close',function(){
    console.log('层关闭了');
})
```

**宽度修改侧栏**

侧栏默认宽度为10rem，如果修改宽度，需要重写侧栏打开动画

```css
//修改侧栏及打开动画
.kui-layer-side{width:10rem;}
.open-side .kui-layer-header,
.open-side .kui-layer-footer,
.open-side .kui-layer-content{
  -webkit-transform:translateX(-10rem);
  transform:translateX(-10rem);
}
```

### 对话框 alert

$.alert(content,title,button,callback)，content为必填项，其他三个参数可以不填，也不讲究顺序。

| 参数       | 类型            | 说明                               |
| -------- | ------------- | -------------------------------- |
| content  | string/object | 内容，必填，字符串，或Layer的参数              |
| title    | string        | 标题，可为空                           |
| button   | Array         | 按扭，如['取消','确定']，可为空              |
| callback | Function      | 回调，可为空，如果`return false`，则不关闭当前窗口 |

**提示代码**

```javascript
//简单弹框
$.alert('提示内容')
//带标题
$.alert('提示内容','标题')
//带按扭
$.alert('提示内容',['取消','确定'])
//带回调
$.alert('提示内容',['取消','确定'],function(index){
  	console.log('你点击了'+index)
})
```

### 操作类 actions

$.actions(button,option)

> `button`为按扭组，如[{text:'用户首页'},{text:'用户资料'},{},{text:'关闭'}]其中{}为分隔线
>
> `option`继承$.layer核心参数所有属性

操作类按扭设置：

| 参数        | 类型           | 说明                                       |
| --------- | ------------ | ---------------------------------------- |
| text      | string       | 按扭文字，支持HTML                              |
| label     | boolean      | 是否为Label，为true时，点击不隐藏，且内容左对齐             |
| onClick   | fun/obj/none | 点击事件，可以为Function，或连接{href:'网址',target:'_blank'} |
| className | string       | 按扭样式，可以填写[base](http://192.168.4.109:8011/demo/base.html)中的状态背景，或状态文字样式小技巧：如果className带有unHide则点击不关闭。 |

```javascript
$.actions([
  
  {text:'我要分享<small class=\'kui-text-node block\'>这里是注释，或HTML</small>',label:true,
   	onClick:function(){
      //这里是点击操作代码
   	}
  },
  //当onClick为false时，点击该按扭无效
  {text:'点击无效',onClick:false},
  {text:'退出登录'},
  //连接按扭
  {text:'百度',onClick:{href:' http://www.baidu.com/',target:'_blank'}},
  //{}为分隔符，将按扭分成不同组
  {},
  //给按扭添加状态背景，也可以是自己的写的样式
  {text:'关闭',className:'kui-bg-warning'}
])
```

### 消息提示 toast

$.toast(option,icon)

| 参数      | 类型            | 说明                            |
| ------- | ------------- | ----------------------------- |
| option  | string/object | 文字内容，或参数对象（参考核心层参数）           |
| icon    | string        | 图标，参考：[icon](/demo/icon.html) |
| timeout | number        | 定时关闭                          |

```javascript
//简单的提示
$.toast('提示信息')
//带图标的提示
$.toast('提示信息','icon-yes')
//设置提示背景，及定时关闭。更详细请参考核心类的设置
$.toast({content:'高级提示',style:'background:rgba(255,255,0,0.7);color:#C00;',timeout:5},'icon-yes');
```

### 加载提示 loading

$.loading(string) 加载提示，string为提示文字，可以为空。



### 标签页 tabpage

$.tabpage(tab,option) 可以创建一个标签页

**tab参数**

| 参数      | 类型     | 说明     |
| ------- | ------ | ------ |
| title   | string | 标签页的标题 |
| content | string | 标签页的内容 |

**option参数**

option完全继承layer的所有属性，并在此基础上新增两个特有属性

| 参数     | 类型     | 说明                                       |
| ------ | ------ | ---------------------------------------- |
| active | number | 默认活动的选项卡，默认为0                            |
| tabbtn | string | 选项卡按扭样式，参考：[button](/demo/button.html)，也可以为自定义样式 |

```javascript
$.tabpage([
  {title:'标签一',content:'标签一的内容'},
  {title:'标签二',content:'标签二的内容'},
  {title:'标签三',content:'标签三的内容'}
],{
  tabbtn:'kui-btn-success',	//设置标签按扭样式
  active:1,	//默认激活第2项
})
```

### 遮罩层 mask

`$.mask(elm)`页面遮罩层，返回当前这遮罩对象。`elm`为容器，默认为`kui-page`或`kui-page-fixed`

```javascript
//显示一个页面遮罩
$.mask().show();
//给指定元素添加遮罩
$.mask('.mylist').show();
//给遮罩设置样式
$.mask().css({background:'rgba(255,0,0,0.3)'}).show();
//不解释
$.mask().toggle();
//不解释
$.mask().addClass('myshade').show();
```



## 选择器(Picker)

picker是一个JS实现的类似select的组件，他可以代替原生的select组件，并且功能更加强大、样式更加统一。

**以下为Picker的参数值，同时完全继承Layer核心参数**

| 参数名           | 默认值                     | 说明                                       |
| ------------- | ----------------------- | ---------------------------------------- |
| title         | undefined               | 选择框标题                                    |
| btn           | [{text:"确定",icon:"fr"}] | 选择框安排，可多个。fl左对待，fr右对齐                    |
| value         | undefined               | 为 picker 添加默认值，数组里每一项对应每一列默认值，如["钱", "明", "小姐"] |
| rotateEffect  | false                   | 是否启用3D效果，启用3D可能会影响性能                     |
| inputReadOnly | true                    | 是否会在input上添加一个 readonly 属性               |
| formatValue   | undefined               | 自定义方法，用来控制如何显示picker的选中值，formatValue: function (picker, value){}，value为数组，长度等于cols长度 |
| cols          | []                      | 数据，{textAlign:对齐,values:[数组],className:'内容框类'} |

!> value为input元素的value属性。多列默认值用空格隔开，如`<input value="钱 明 小姐">`。如果任一列默认值本身含空格(如‘ipad mini 2’),那就只能用JS方法调用模式传入value参数

**picker方法**

你可以通过 `$(".picker").picker("method", args1, args2...)` 的方式来调用相关的方法。

```javascript
$("#picker-name").picker("open");
$("#picker-name").picker("close");
//一个字符串数组，其中每个字符串对应每一列
$("#picker-name").picker("setValue", ["2012", "12", "12"]);
```

### 普通选择器

```html
<input id="text1" type="text" placeholder="手机" />
<input id="text2" type="text" placeholder="称呼" />
<script>
//单列示例
$("#text1").picker({
	title:'手机',
	cols: [{
		textAlign: 'center',
		values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3'],
      	//设置列宽为100%，也可以结合float删格，如：kui-col-50，列宽为50%
		cssClass: 'picker-items-col-full'
	}],
  	//以下为回调，继承Layer
    onshow:function(){
		console.log('Picker显示后触发！')
    },
  	onshow:function(){
      console.log('Picker关闭后触发！')
  	}
});
//多列示例
$("#text2").picker({
	title:'称呼',
	cols: [{
		textAlign: 'center',
		values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
	},
	{
		textAlign: 'center',
		values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
	},
	{
		textAlign: 'center',
      	//如果希望显示文本与值不同，可以用以下格式，支持混用
		values: [{text:'先生',value:'Mr.'}, {text:'小姐',value:'Ms.'}]
	}]
});
</script>
```

### 日期选择器

地区选择器需引入：`picker.js`和`datetime-picker.js`或`picker.min.js`

```html
<input id="bsday" type="text" placeholder="请输入生日" />
<script>
$("#bsday").datetimePicker({
	title:'你的生日',
  	minYear:1950,	//开始年份，默认：1950
  	maxYear:2017, 	//结束年份，默认：当前年份+10
   	value: '1985-12-4 9:34'
});
</script>
```





### 地区选择器

地区选择器需引入：`picker.js`和`city-picker.js`

```javascript
$("#city").cityPicker({
	title:'请选择地区',
	value:['天津', '河东区']
	//value: ['四川', '内江', '东兴区']
});
```

## 日历(Calendar)

完全继承layer所有参数和方法，新增如下参数：

| 参数名           | 默认值                                  | 说明                                       |
| ------------- | ------------------------------------ | ---------------------------------------- |
| value         | undefined                            | 初始化打开后默认选中的时间。格式是`value: ['2012-06-18']` |
| inputReadOnly | true                                 | 是否在input上增加一个 `readonly` 属性使用户无法自己输入     |
| dateFormat    | 'yyyy-mm-dd'                         | 格式化日期                                    |
| minDate       | undefined                            | 最小可选日期，比如 `2015-06-01`                   |
| maxDate       | undefined                            | 最大可选日期，比如 `2015-08-01`                   |
| onChange      | function(p, values, displayValues){} | 当用户选择日期时触发                               |


> 当用户选择完日期之后，会在 input 上触发 `change` 事件，你可以监听此事件。

```javascript
//日历代码
$("#bsday").calendar({
    value: ['2015-12-05'],
	onChange:function(){
		console.log('change')
	},
  //layer显示时触发
	onshow:function(){
		console.log('onshow')
	}
})
```

如果同时需要选择日期、时间，建议使用Picker日期选择器

## 滚动组件(scroller)

本组件`scroller`是对`JRoll`的重新封装。

| 参数             | 默认值                | 说明                                       |
| -------------- | ------------------ | ---------------------------------------- |
| inner          | false              | *scroller.js独有* 滚动的内置框，默认为`false`，可以设置为`true`自动添加滚动内层框，样式名`.kui-content-inner` |
| id             | [随机生成]             | id，jroll对象的唯一标记，建议手动提供id，方便在全局JRoll.jrollMap访问指定jroll对象，不提供时系统自动创建。 |
| scrollX        | false              | 使能水平滑动`可动态修改`                            |
| scrollY        | true               | 使能垂直滑动`可动态修改`                            |
| scrollFree     | false              | 使能自由滑动，默认情况下，x方向在滑动时，y方向不能滑动，相反亦然，如果应用于对图片进行放大滑动，可将此参数设为true`可动态修改` |
| minX           | 0                  | 向左滑动的边界值`可动态修改`                          |
| maxX           | *[负scroller的宽]*    | 向右滑动的边界值`可动态修改`                          |
| minY           | 0                  | 向下滑动的边界值`可动态修改`                          |
| maxY           | *[负scroller的高]*    | 向上滑动的边界值`可动态修改`                          |
| zoom           | false              | 使能缩放`可动态修改`                              |
| zoomMin        | 1.0                | 最小缩放倍数`可动态修改`                            |
| zoomMax        | 4.0                | 最大缩放倍数`可动态修改`                            |
| bounce         | true               | 允许回弹`可动态修改`                              |
| scrollBarX     | false              | 开启水平滚动条                                  |
| scrollBarY     | false              | 开启垂直滚动条                                  |
| scrollBarFade  | false              | 滚动条使用渐隐模式                                |
| preventDefault | true               | 禁止touchmove默认事件                          |
| momentum       | true               | 开启滑动加速，惯性过渡`可动态修改`                       |
| autoStyle      | true               | 自动为wrapper和scroller添加样式                  |
| autoBlur       | true               | v2.4.3新增，在滑动时自动将input/textarea失焦收起软键盘。设为false将会在IOS上出现光标不跟随输入框移动的现象 |
| scroller       | *[wrapper的第一个子元素]* | 指定scroller，不可动态更改，可以是id选择器字符串*#scroller*，也可以是dom对象*document.getElementById('scroller')* |
| edgeRelease    | true               | v2.4.7新增，边缘释放，滑动到上下边界自动结束，解决手指滑出屏幕没触发touchEnd事件的问题。如果手指滑动屏幕的速度过快该选项并不一定起作用 |

!> 之前封装的是`IScroll5`，因体积大，性能一般，故替换为`JRoll`老版本用户请自行升级。

```html
<div class="myScroll">
  <p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p><p>123456</p>
</div>

<script>
$('.myScroll').scroller({
  inner:true,		//自动添加内容器(scroller独有)
  scrollBarY:true,	//开启垂直滚动条
  scrollBarFade:true	//滚动条使用渐隐模式
  //...其他属性
})

/***************
方法调用：refresh,scrollTo,enable,destroy,scale,call
****************/
//刷新内容
$('.myScroll').refresh();
//滚动到指定位置
$('.myScroll').scrollTo(0,-120,200)

//事件绑定，支持所有IScroll5事件
$('.myScroll').on('scrollStart',function(){
  console.log('开始滚动');
})

/***************
事件：scrollStart,scroll,scrollEnd,touchEnd,zoomStart,zoomEnd,refresh
****************/
$('.myScroll').on("scrollStart", function() {
    console.log(this.x); //输出当前x偏移量，this指向jroll对象
});

//获得JRoll对象
var JRoll=$('.myScroll').data('scroller');
</script>
```

JRoll是一个优秀的国产滚动组件，详细使用，请参考官网说明

项目官网：http://www.chjtx.com/JRoll/

项目地址：https://github.com/chjtx/JRoll



# 第三方扩展插件

本项目还收录了一些优秀的第三方插件，具体维护均由第三方团队维护。

## 轮播

暂无收录

## 图片预览

图片预览组件推荐`PhotoSwipe`，该组件功能强大，JS压缩后`31K`，有皮肤。

项目官网：http://photoswipe.com/

项目地址：https://github.com/dimsemenov/photoswipe



