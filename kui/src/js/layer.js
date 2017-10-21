/*$.layer
 *为核心类，返回当层元素对象，option:参数如下
 *id		层ID，唯一性标识。
 *type		层类型，默认类型：[0]页面层，[1]alert层，[2]
 *head		标题区，字符串或{title:'标题',style:'头部样式',btn:[{text:'按扭名',icon:'按扭图标及样式',onClick:点击事件,isclose:是否关闭按扭}]}
 *side		侧栏，值为字符串，或['内容','CSS样式']
 *content	内容区，字符串，或['内容','CSS样式']
 *foot		底部区，字符串，或['内容','CSS样式']
 *skin	样式名
 *size		尺寸['宽','高']
 *style		自定义样式
 *anim		动画名称，或对象[{初始CSS},{入场动画},{出场动画},time]
 *shade		是否显示遮罩，1或{css}
 *shadeclose	点击遮罩关闭
 *timeout	定时关闭，秒
 *autoshow	自动显示
 
 scroller	(默认False)是否启用JS滚动，该功能依赖Scroller.js
 *方法：
 *onshow		显示完成后触发
 *onclose		关闭后触发
 *事件
 *open		显示后出发
 *close		关闭后触发
*/
!function(win,$){
	"use strict";
	var index=0,tap='click';
	//层入场动画，格式：[CSS默认值，进入效果，关闭效果，动画时间]
	var fxArr={
		left:[{'-webkit-transform':'translateX(-100%)'},{translateX:'0'},{translateX:'-100%'},200],
		right:[{'-webkit-transform':'translateX(100%)'},{translateX:'0'},{translateX:'100%'},200],
		top:[{'-webkit-transform':'translateY(-100%)'},{translateY:'0'},{translateY:'-100%'},300],
		bottom:[{'-webkit-transform':'translatey(100%)'},{translateY:'0'},{translateY:'100%'},300],
		zoom:[{'-webkit-transform':'scale(0.1)',opacity:0.1},{scale:1,opacity:1},{scale:0.1,opacity:0.1},250],
		fade:[{opacity:0,'-webkit-transform':'scale(1.1)'},{opacity:1,scale:1},{opacity:0,scale:1.1},100],
	};
	$.layer=function(option){
		index++;
		var defaults={
			id:'layer-'+index,
			type:'0',
			head:'',
			content:'',
			foot:'',
			skin:'',
			style:{},
			size:[],
			timeout:'',
			anim:'fade',
			shade:true,
			shadeclose:true,
			autoshow:true,
			
			scroller:false,	//是否启用JS滚动
			//事件
			onshow:new Function(),
			onclose:new Function()
		};
		
		//合并用户参数
		var opt=$.extend(defaults,option);
		//检测是否已存在
		if($('#'+opt.id).size()){return false;}
		
		//添加自定义出场效果
		var anim=opt.anim,fx;
		if($.isArray(anim)){
			fx=anim;
			anim='user-fx'+index;
			fxArr[anim]=fx;
		}else{
			fx=fxArr[anim];
		}
		
		/*格式化头部*/
		var head=opt.head||'',hdstyle,hdbtn;
		if($.isPlainObject(opt.head)){
			hdbtn=$.map(($.isArray(opt.head.btn)?opt.head.btn:[]),function(itm,i){
				var icon=itm.icon||'';
				icon=icon.match(/fl|fr/g)?icon:icon+' fl';
				icon=itm.isclose!=(0||false) ? icon+' kui-layer-close':icon;
				
				return $('<a>'+(itm.text||'')+'</a>').addClass(icon).on(tap,(itm.onClick||new Function()));
			})||'';
			head=opt.head.title?'<h1 class="kui-title">'+opt.head.title+'</h1>':'';
			hdstyle=$.isPlainObject(opt.head.style)?opt.head.style:_cssToJson(opt.head.style);
		}
		var $head=head?$('<div class="kui-layer-header">'+head+'</div>').prepend(hdbtn).css(hdstyle).addClass(opt.head.className||''):'';
		
		//side侧栏
		var side=opt.side||'',sidecss={};
		if($.isArray(side)){
			sidecss=setStyle(side[1]);
			side=side[0];
		}
		var $side=side?$('<side class="kui-layer-side">'+side+'</side>').css(sidecss[0]).addClass(sidecss[1]):'';
		
		//内容区
		var content=opt.content||'',constyle={};
		if($.isArray(content)){
			constyle=setStyle(content[1]);
			content=opt.content[0];
		}
		var $content=content?$('<div class="kui-layer-content" />').html(content).css(constyle[0]).addClass(constyle[1]):'';
		
		//底部导航按扭
		var foot=opt.foot||'',ftStyle=[];
		if($.isArray(foot)){
			ftStyle=setStyle(foot[1]);
			foot=foot[0];
		}
		var $foot=foot?$('<div class="kui-layer-footer"></div>').html(foot).css(ftStyle[0]).addClass(ftStyle[1]):'';
		
		//组装
		var type=opt.type,shade=opt.shade;
		
		var $shade=$('<div class="kui-layer-shade'+(opt.shadeclose?' kui-layer-close':'')+'"></div>');
		//shade为CSS对象时，遮罩样式
		if(shade && shade!==true){
			var shd=setStyle(shade);
			$shade.css(shd).addClass(shd);
		}
		var $layer=$('<div class="kui-layer" anim="'+anim+'"></div>').addClass(opt.skin||'').append($side,$head,$content,$foot);
		var $lay=$('<div class="kui-layer-wrap"></div>').addClass('type-'+type).attr({id:opt.id,type:type,'layer-index':index}).append($shade,$layer);
		$lay.appendTo('body');
		
		//属性绑定到层元素中
		$lay.option=opt;
		
		//默认显示层
		if(opt.autoshow)$.layer.open($lay);
		
		//初始化内容JS滚动
		if(opt.scroller){
			//内容滚动对象
			var dft={inner:true,bounce:true,scrollBarY:true,scrollBarFade:true};
			var scropt=$.extend(dft,$.isPlainObject(opt.scroller)?opt.scroller:{});
			var jScr=$content.scroller(scropt);
			//$lay.constructor.prototype.jRoll=jScr;
			//绑定IScroll事件
			/*var _event=['scrollStart','scroll','scrollEnd','touchEnd','zoomStart','zoomEnd','refresh'];
			$.each(_event,function(i,evt){
				jScr.on(evt,function(e){
					$lay.trigger($.Event(evt));
				});
			});*/
		}
		
		//绑定显示方法:obj.open()
		$lay.constructor.prototype.open=function(){
			$.layer.open(this);
		};
		//绑定关闭方法:obj.close()
		$lay.constructor.prototype.close=function(){
			//如果当前元素有路由，则返回一步
			$(this).not('.closeing').hasClass('layer-route')&&history.back();
			$.layer.close(this,opt.close);
		};
		return $lay;
	};
	/*显示窗口*******
	 *index 窗口索引，为all时关闭所有（且不触发关闭事件）
	 *call	当index=all时call可传入窗口类型。否则call传入onshow()事件
	***************/
	$.layer.open=function(index){
		if(index>=0){
			$.layer.open($('[layer-index="'+index+'"]'));
		}else if(typeof(index)=="object"){
			index.size()&&$(index).appendTo('body');//如果元素不存在，则先添加元素
			var $lay=index,$layer=$lay.children('.kui-layer'),$shade=$lay.children('.kui-layer-shade'),$layContent=$layer.children('.kui-layer-content');
			var opt=$lay.option,
			anim=$layer.attr('anim')||'',
			fx=fxArr[anim]||fxArr.fade;
			$lay.css({display:'-webkit-box'});
			if($shade){
				//阻止遮罩层拖动冒泡
				$shade.on('touchmove',function(e){
					if(e && e.preventDefault){
						e.preventDefault();
					}
				});
				//遮罩层动画显示
				$shade.animate({opacity:1},'ease-out',100);
			}
			//添加出场中样式
			$lay.addClass('showing');
			//入场前CSS合并到样式设置中
			var style=$.extend(typeof(opt.style)=='object'?opt.style:_cssToJson(opt.style),fx[0]),size=opt.size;
			//设置size参数
			if(size[0])style.width=size[0];
			if(size[1])style.height=size[1];
			fx[1].opacity=1;
			$layer.css(style).animate(fx[1],'ease-out',fx[3],function(){
				//删除出场中样式
				$lay.removeClass('showing');
				
				//刷新滚动对象
				/*if(opt.scroller){
					$lay.jRoll.refresh();
				}*/
				//显示后触发onshow事件，返回当前层对象
				opt.onshow($lay);
				//自定义事件
				var e=$.Event('show');
				//触发show事件
				$layer.trigger(e);
				
				//为kui-layer-close类绑定关闭事件
				$lay.find('.kui-layer-close').on(tap,function(){
					$lay.close();
				});
				//为kui-layer-sidebtn类绑定关闭事件
				$lay.find('.kui-layer-sidebtn').on(tap,function(){
					$layer.toggleClass('open-side');
				});
				
				//定时关闭
				if(opt.timeout){
					setTimeout(function(){
						$('#'+$lay.attr('id')).size()>0&&$lay.close();
					},(opt.timeout-1)*1000);
				}
				
			});
			
		}
	};
	/*关闭窗口*******
	 *index 窗口索引，为all时关闭所有（且不触发关闭事件）
	 *call	当index=all时call可传入窗口类型，可关闭同类型所有层。否则call传入onclose()事件
	 *remove	关闭后，是否删除层元素，默认：true
	***************/
	$.layer.close=function(index,call,remove){
		remove=remove===undefined||true;
		if(index=='all'){
			var tp=call?'[type="'+call+'"]':'';
			$('[layer-index]'+tp).remove();
		}else if(index>=0){
			$.layer.close($('[layer-index="'+index+'"]'));
		}else if(typeof(index)=="string"&&$('#'+index).size()){
			$.layer.close($('#'+index));
		}else if(typeof(index)=="object"&&index.size()){
			var $lay=index,$layer=$lay.children('.kui-layer'),$shade=$lay.children('.kui-layer-shade'),opt=$lay.option||{};
			var anim=$layer.attr('anim')||'',fx=fxArr[anim]||fxArr.fade;
			var onclose=call||new Function(),closeanim=fx[2]||{},closeTime=fx[3]||'normal';
			//删除自定义动画
			anim.indexOf('user-fx')===0&&delete fxArr[anim];
			//遮罩层关闭动画
			$shade&&$shade.animate({opacity:0},'ease-out',closeTime);
			//关闭层动画（加透明度渐变）
			closeanim.opacity=0;
			//添加正在关闭样式
			$lay.addClass('closeing');
			//关闭效果
			$layer.animate(closeanim,'ease-out',closeTime,function(){
				//删除正在关闭样式
				$lay.removeClass('closeing');
				//删除层
				remove&&$lay.remove();
				//自定义事件
				var e=$.Event('close');
				//属性中的关闭回调
				if($.isFunction(opt.onclose))opt.onclose(e);
				//传入的关闭回调
				onclose(e);
				//触发自定义事件
				$layer.trigger(e);
			});
		}
	};
	/*-------------------
	 *遮罩层 elm:容器
	-------------------*/
	$.mask=function(elm){
		var $pg=typeof(elm)=='object'?elm:$(elm||'body'),msk='kui-page-mask';
		var $msk=$pg.children('.'+msk);
		$msk=$msk.size()?$msk:$('<div class="'+msk+'" />');
		$msk.appendTo($pg);
		return $msk;
	};
	/**********************
	 * $.alert 	提示框
	 *content	内容
	 *title		标题:string
	 *button	按扭['确定','取消']:array
	 *callback	点击按扭回调,返回按扭序列:Function
	**********************/
	$.alert=function(content,title,button,callback){
		if($('#kui-alert').size())return;
		var con=$.isPlainObject(content)?content:{content:content};
		var dft={id:'kui-alert',head:'',content:'',foot:'',type:'alert',shadeclose:0},tpr;
		var opt=$.extend(dft,con);
		var tpi={},tpArr=['string','array','function'],tpPr=['title','button','callback'];
		//自动判断类型
		if(title){
			tpr=tpPr[$.inArray($.type(title),tpArr)];
			tpi[tpr]=title;
		}
		if(button){
			tpr=tpPr[$.inArray($.type(button),tpArr)];
			tpi[tpr]=button;
		}
		if(callback){
			tpr=tpPr[$.inArray($.type(callback),tpArr)];
			tpi[tpr]=callback;
		}
		opt.skin+=' kui-alert';
		opt.head=tpi.title||'';				//标题
		callback=tpi.callback||new Function();	//回调
		button=tpi.button||['关闭'];			//按扭
		opt.foot=[$.map(button,function(itm,i){return '<a class="kui-alert-btn '+(i<button.length-1?'kui-1px-r':'')+'" btn="'+i+'">'+itm+'</a>';}).join(''),'kui-1px-t'];
		//窗口页
		var ialert=$.layer(opt);
		//绑定按扭点击事件
		ialert.find('.kui-alert-btn').on(tap,function(){
			var btni=$(this).attr('btn');
			var cbk=callback(btni);
			if(cbk!==false)$.layer.close(ialert);
			//自定义回调事件
			var e=$.Event('callback');
			e.index=btni;
			ialert.trigger(e);
		});
		return ialert;
	};
	
	/********************************
	 * $.actions([btn],option)	操作表
	 *操作表可以让用户从多个可选的操作中选择一个
	 *button 	一维数组数据，数据格式如：[{text:'按扭名',className:'按扭样式名',label:1,onClick:function},{text:'按扭名',onClick:{href:'',target:'',style:''}}]
	 {}为分组符
	 *option	继承layer参数
	 *
	*******************************/
	$.actions=function(button,option){
		button=button||[{text:'关闭',label:1}];
		var sheet='';
		//按扭遍历
		$.each(button,function(i,itm){
			if(itm.text){
				var className=itm.className?' '+itm.className:'',onClick=itm.onClick,
				attr=typeof(onClick)=='object'?' '+$.map(onClick,function(v,k){return k+'='+v;}).join(' '):'';
				var isHide=onClick===false?' unHide':'';
				var label=itm.label?'kui-actions-label':'kui-actions-item';
				sheet+='<a '+attr+' class="'+label+className+isHide+' kui-1px-b" label-index="'+i+'">'+itm.text+'</a>';
				
			}else{
				sheet+='</div><div class="kui-actions-group">';
			}
		});
		//结构层参数
		option=$.extend({content:'',skin:'',type:'actions',anim:'bottom'},option||{});
		option.content='<div class="kui-actions-group">'+sheet+'</div>';
		option.skin+=' kui-actions';
		var actions=$.layer(option);
		actions.find('.kui-actions-item').not('.unHide').on(tap,function(){
			var ti=$(this).attr('label-index');
			var callback=button[ti].onClick;
			typeof(callback)=='function'&&callback();
			$.layer.close(actions);
		});
		return actions;
	};
	
	/**************************
	 * $.toast
	 * option	继承$.layer所有属性
	 * icon		图标
	 * timeout	定时关闭
	**************************/
	$.toast=function(option,icon,timeout){
		option=$.isPlainObject(option)?option:{content:option};
		option.content=(icon?'<i class="toast-icon '+icon+'"></i>':'')+'<div class="toast-msg">'+option.content+'</div>';
		option=$.extend({anim:'fade',type:'toast',timeout:timeout||0},option);
		option.skin='kui-toast '+(option.skin||'');
		return $.layer(option);
	};
	
	/**************************
	 * $.loading 加载
	 *msg		加载展示的文字
	**************************/
	$.loading=function(msg){
		return $.toast({id:'kui-loading',type:'loading',content:msg||'',skin:'kui-loading'},'icon-load');
	};
	
	/****************************
	 * $.tabpage Tab页
	 * tab	内容数组:[{title:'',content:''}]
	 * option.active 数字，默认显示的
	 * option.tabbtn	切换标签按扭组样式，
	***************************/
	$.tabpage=function(tab,option){
		tab=tab||[];
		option=$.extend({head:'',content:'',skin:'',type:'tabpage',active:0,tabbtn:'kui-btn-default',anim:'right'},(option||{}));
		option.type+=' tab';
		option.skin+=' kui-tab';
		option.head={title:'',btn:[{text:'关闭',icon:'fl icon-left'}]};
		$.each(tab,function(i,itm){
			var cur=i==option.active?' active':'';
			option.head.title+='<span class="kui-tab-titm '+option.tabbtn+' '+cur+'">'+itm.title+'</span>';
			option.content+='<div class="kui-tab-content tab_'+i+''+cur+'">'+(itm.content||'')+'</div>';
		});
		option.head.title='<div class="kui-tab-tit kui-btns-group">'+option.head.title+'</div>';
		//option.content='<div class="kui-tab-inner" style="width:'+tab.length+'00%;">'+option.content+'</div>';
		var tabpage=$.layer(option);
		tabpage.on('show',function(){
			$(this).find('.kui-tab-titm').on(tap,function(){
				$(this).addClass('active').siblings().removeClass('active');
				tabpage.find('.kui-tab-content').eq($(this).index()).addClass('active').siblings().removeClass('active');
			});
		});
		return tabpage;
	};
	
	//根据数居返回样式
	var setStyle=function(css){
		var style={},clases='';
		if($.isPlainObject(css)){
			style=css;
		}else if(css.indexOf(':')<0){
			clases=css.match(/^[A-Za-z0-9\-\_\s]+$/g)?css:'';
		}else{
			style=_cssToJson(css);
		}
		return [style,clases];
	};
	//cssToJson
	var _cssToJson=function(css){
		if(!css)return {};
		var json={},icss=css.split(';')||[];
		$.each(icss,function(i,itm){
			var arr=itm.split(':');
			if(arr[0])json[arr[0]]=arr[1];
		});
		return json;
	};
	
}(window,Zepto);