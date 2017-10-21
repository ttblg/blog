## 徽章 (Badge)

```html
<!--基础徽章-->
<span class="kui-badge">1</span>
<span class="kui-badge">徽标</span>
<span class="kui-badge-muted">徽标</span>
<span class="kui-badge-s">123</span>
<!--状态徽章-->
<span class="kui-badge kui-bg-primary">primary</span>
<span class="kui-badge kui-bg-success">success</span>
<span class="kui-badge kui-bg-danger">danger</span>
<span class="kui-badge kui-bg-warning">warning</span>
<span class="kui-badge kui-bg-grey">grey</span>
<!--加白边状态徽章，kui-badge-border为白边样式-->
<span class="kui-badge kui-badge-border">primary</span>
<span class="kui-badge kui-badge-border kui-bg-primary">primary</span>
<span class="kui-badge kui-badge-border kui-bg-success">success</span>
<span class="kui-badge kui-badge-border kui-bg-danger">danger</span>
<span class="kui-badge kui-badge-border kui-bg-warning">warning</span>
<span class="kui-badge kui-badge-border kui-bg-grey">grey</span>
```

## 按扭 (Button)

样式：`kui-btn-*`为普通实心按扭，`kui-btn-plain-*`空间按扭。`kui-btn-block`按扭转为块。

大小：不加大小，则为普通大小，`kui-btn-s`小按扭，`kui-btn-m`中按扭，`kui-btn-lg`大按扭。

状态：`disabled`禁用状态，`active`为激活状态。

按扭组：`kui-btns-group`样式

```html
<!--基础按扭-->
<a class="kui-btn-default">kui-btn-default</a>
<a class="kui-btn-primary">kui-btn-primary</a>
<a class="kui-btn-success">kui-btn-success</a>
<a class="kui-btn-warning">kui-btn-warning</a>
<a class="kui-btn-danger">kui-btn-danger</a>
<!--按扭大小-->
<a class="kui-btn-default kui-btn-s">kui-btn-default</a>
<a class="kui-btn-primary kui-btn-m">kui-btn-primary</a>
<a class="kui-btn-success kui-btn-lg">kui-btn-success</a>
<!--空心按扭-->
<a class="kui-btn-plain-default">kui-btn-default</a>
<a class="kui-btn-plain-primary">kui-btn-primary</a>
<a class="kui-btn-plain-success">kui-btn-success</a>
<a class="kui-btn-plain-warning">kui-btn-warning</a>
<a class="kui-btn-plain-danger">kui-btn-danger</a>
<!--块按扭-->
<a class="kui-btn-default kui-btn-block">kui-btn-block</a>
<a class="kui-btn-primary kui-btn-block">kui-btn-block</a>
<!--禁用的按扭-->
<a class="kui-btn-default disabled">kui-btn-default</a>
<a class="kui-btn-primary disabled">kui-btn-primary</a>
<!--按扭组-->
<div class="kui-btns-group">
  <a class="kui-btn-default">button1</a>
  <a class="kui-btn-default active">button2</a>
  <a class="kui-btn-default">button3</a>
  <a class="kui-btn-default">button4</a>
</div>
```

## 列表 (List)

`kui-list` 列表样式，`kui-list-link`带箭头，`kui-list-active`点击效果。

```text
kui-list
	┝kui-list-item
		┝kui-list-media
		┝kui-list-info
			┝kui-info-tit
			┝kui-info-desc
		┝kui-list-cell		
```

示例代码：

```html
<ul class="kui-list kui-list-link kui-list-active kui-1px-tb">
  <li class="kui-list-item"><div class="kui-list-info">带箭头列表</div></li>
  <li class="kui-list-item active">
    <div class="kui-list-info">带箭头列表.active</div>
    <div class="kui-list-cell"><span class="kui-badge kui-badge-border">321</span></div>
  </li>
  <li class="kui-list-item">
    <div class="kui-list-info">带箭头列表</div>
    <div class="kui-list-cell"><span class="kui-badge kui-badge-border">321</span></div>
  </li>
  <li class="kui-list-item">
    <div class="kui-list-media"><img src="img/f1.jpg" width="80" /><span class="kui-badge kui-badge-border">8</span></div>
    <div class="kui-list-info">
      <div class="kui-info-tit"><div class="kui-info-tit-txt">这里是标题</div><p>01-23</p></div>
      <p class="kui-info-desc">塞下秋来风景异。衡阳雁去无留意。四面边声连角起。千嶂里。长烟落日孤城闭。</p>
    </div>
  </li>
</ul>
```

## 表单 (Form)

```html
<div class="kui-list kui-form kui-1px-tb">
	<li class="kui-list-item">
		<div class="kui-form-label">姓名</div>
		<div class="kui-form-input">
			<input type="text" placeholder="请输入姓名" />
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">性别</div>
		<div class="kui-form-input">
			<label>
				<input type="radio" name="sex" />
				<span>男生</span></label>
			<label>
				<input type="radio" name="sex" />
				女生</label>
		</div>
	</li>
	<li class="kui-list-item kui-form-error">
		<div class="kui-form-label">电话</div>
		<div class="kui-form-input">
			<input type="tel" placeholder="请输入电话" />
		</div>
		<div class="kui-list-cell icon-attention"></div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">生日</div>
		<div class="kui-form-input">
			<input type="date" placeholder="请输入生日" />
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">生日</div>
		<div class="kui-form-input">
			<input type="datetime-local">
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">数值</div>
		<div class="kui-form-input">
			<input id="Slider" type="range" min="0" max="500" oninput="regval.innerHTML=this.value"  />
		</div>
		<div id="regval" class="kui-list-cell">250</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">爱好</div>
		<div class="kui-form-input">
			<label>
				<input type="checkbox" name="hobe" />
				<span>读书</span></label>
			<label>
				<input type="checkbox" name="hobe" />
				音乐</label>
			<label>
				<input type="checkbox" name="hobe" />
				电影</label>
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">地区</div>
		<div class="kui-form-input">
			<select>
				<option>广东</option>
				<option>四川</option>
				<option>湖南</option>
			</select>
			<select>
				<option>东莞</option>
				<option>虎门</option>
				<option>长安</option>
			</select>
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-input">是否验证</div>
		<div>
			<input type="checkbox" class="kui-switch" />
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-input">是否订阅</div>
		<div>
			<input type="checkbox" class="kui-switch" checked />
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">验证</div>
		<div class="kui-form-input">
			<input type="tel" placeholder="请输入验证码" />
		</div>
		<div class="kui-form-vcode">
			<div class="kui-btn-default">获取验证码</div>
		</div>
	</li>
	<li class="kui-list-item">
		<div class="kui-form-label">备注</div>
		<div class="kui-form-input">
			<textarea placeholder="请输入备注"></textarea>
		</div>
	</li>
	<li class="kui-list-item"> <a class="kui-btn-default kui-btn-block kui-col-1">取消</a>
		<button class="kui-btn-success kui-btn-block kui-col-1">提交表单</button>
	</li>
</div>
```

## 表格 (Table)

`kui-table`表格样式，`kui-table-active`点击例的效果，可以通过表格的`cellpadding`属性设置内边距，但`cellspacing`设置无效。

```html
<table class="kui-table kui-table-active" width="100%" border="0" cellspacing="0" cellpadding="5">
  <tr>
    <th>title</th>
    <th>title</th>
  </tr>
  <tr>
    <td>content</td>
    <td>content</td>
  </tr>
  <tr>
    <td>content</td>
    <td>content</td>
  </tr>
  <tr>
    <td>content</td>
    <td>content</td>
  </tr>
</table>
```