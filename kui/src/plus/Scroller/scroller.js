/*************************
 *系统内置滚动组件封装
 *$(elm).scroller({});	返回滚动对象
 *scroller.js
 *inner:true|false	是否添加内容器
*************************/
+function($){
	var defaults={
		inner:false,		//是否添加内框
		bind:'',			//绑定滚动事件、方法的元素
	};
	$.fn.scroller=function(params){
		return this.each(function(){
			if(!this)return;
			var $this = $(this);
			var data = $this.data('scroller');
			var myscroll;
			if (!data) {
				var opt=$.extend(defaults,params);
				//自动添加内框
				if(opt.inner && $(this).children('.kui-content-inner').size()===0){
					var inner=$('<div class="kui-content-inner" />');
					$this.wrapInner('<div class="kui-content-inner" />');
				}
				
				myscroll=new JRoll(this,opt);
				$this.data('scroller',myscroll).css({overflow:'hidden'});
				//绑定方法
				//$.extend($this.constructor.prototype,setScroll);
				//绑定IScroll事件
				var _event=['scrollStart','scroll','scrollEnd','touchEnd','zoomStart','zoomEnd','refresh'];
				$.each(_event,function(i,evt){
					myscroll.on(evt,function(e){
						$this.trigger($.Event(evt));
					});
				});
				//绑定方法
				var _action=['refresh','scrollTo','disable','enable','destroy','scale','call'];
				$.each(_action,function(i,act){
					$this.constructor.prototype[act]=function(){
						myscroll[act].apply(myscroll,arguments);
					};
				});
				
			}
			return myscroll;
		});
	};
}(Zepto);