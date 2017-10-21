/**
 * KevinUI 1.2.0
 *
*/

!function(win,$){
	'use strict';
	var device = {};
    var ua = navigator.userAgent;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	var local=window.location;
	
	device.os = device.version = null;
	if (android) {
		device.name=device.os='android';
		device.version=android[2];
	}
	if(ipad || iphone || ipod){
		device.os = 'ios';
		device.name=iphone?'iphone':ipad?'ipad':ipod?'ipod':'';
		device.version=(ipod?ipod[3]:(ipad|| iphone)[2]).replace(/_/g, '.');
	}
	//KUI属性
	win.kui={
		tap:'click',
		version:'1.2.0',
		ua:ua,
		device:device,
		isWeixin:/MicroMessenger/i.test(ua),
		appback:'',
		
	};
	
	//获取地址栏参数
	kui.Get=function (name){
		var reg = new RegExp("(^|&)" + name.replace(/#/g,'') + "=([^&]*)(&|$)", "i");
		var local=name.substr(0,1)=="#"?win.location.hash:win.location.search;
		var r = local.substr(1).match(reg);
		var context = "";
		if (r !== null) {
			context = r[2];
		}
		reg = null;
		r = null;
		return context === null || context === "" || context == "undefined" ? null: context;
	};
	//缓存
	kui.cache=function(name,value,time){
		if(typeof(name)!='string')return false;
		var fixname='cache_'+name,t=new Date().getTime(),data;
		if(value===undefined){
			data=eval('('+localStorage.getItem(fixname)+')')||{};
			if(data.time>0&&data.time<t){
				kui.removeCache(name);
				data={};
			}else{
				data=data;
			}
			return data.data;
		}else{
			time=isNaN(time)?0:time;
			var extime=time>0?time*60*60*1000+t:0;
			data={data:value,time:extime};
			localStorage.setItem(fixname,JSON.stringify(data));
			return value;
		}
		
	};
	//删除缓存
	kui.removeCache=function(name){
		var fixname='cache_'+name;
		if(name===undefined){
			$.each(localStorage,function(id,itm){
				if(id==fixname){
					kui.removeCache(name);
				}
			});
		}else{
			localStorage.removeItem('cache_'+name);
		}
	};
	//获取cookie
	kui.getCookie = function(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr !== null) return unescape(arr[2]);
		return null;
	};
	//删除cookie
	kui.delCookie = function(name) {
		name = escape(name);
		path = path? ';path=' + path:'';
		var expires = new Date(0);  
		document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path; 
	};
	//添加cookie
	kui.addCookie = function(name, value, day, path) {
		var str = name + "=" + escape(value);
		var date = new Date();
		var ms = (day||30) * 24 * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += ";path=" + (path || '/') + ";expires=" + date.toGMTString();
		document.cookie = str;
	};
	
	$(function(){
		FastClick.attach(document.body);
		
		//返回策略
		$(document).on('click','.app-back',function(){
			$.isFunction(kui.appback)?kui.appback():history.back();
		});
	});
	
}(window,Zepto);