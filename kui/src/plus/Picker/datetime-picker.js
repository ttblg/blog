/* jshint unused:false*/

+ function($) {
    "use strict";

    var today = new Date();

    var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };
	//初始化分钟数组，其他的也基于此数组
	var initMinutes=(function () {
			var arr = [];
			for(var i=0;i<=59;i++){arr.push(formatNumber(i));}
			return arr;
	})();
	var initHours=(function () {
			var arr = [];
			for(var i=0;i<=23;i++){arr.push(i);}
			return arr;
	})();
    var getDays = function(max) {
        return initMinutes.slice(1,max?max+1:32);
    };

    var getDaysByMonthAndYear = function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return getDays(d.getDate());
    };
    var initMonthes = initMinutes.slice(1,13);

    var initYears = function (maxYear,minYear) {
        var arr = [];
        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
        return arr;
    };


    var defaults = {
		skin:'kui-timepicker',
		minYear:'1950',
		maxYear:today.getFullYear()+10,
        rotateEffect: false,  //为了性能
        onChange: function (picker, values) {
            var days = getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
            var currentValue = picker.cols[2].value;
			$(picker.cols[2].items).eq(days.length-1).addClass('maxDay').siblings().removeClass('maxDay');
            if(currentValue > days.length){
				currentValue = days.length;
			}
			picker.cols[2].setValue(currentValue);
        },
        formatValue: function (p, values) {
            return values[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4];
        }
    };
	var date2arr=function(date){
		date=date.replace(/-/g,'/');
		var dt=new Date(date),dta=[dt.getFullYear(),formatNumber(dt.getMonth()+1),formatNumber(dt.getDate()),dt.getHours(),formatNumber(dt.getMinutes())];
		return dta;
	};
    $.fn.datetimePicker = function(params){
        return this.each(function() {
            if(!this) return;
			var ival=$(this).val()||(today.getFullYear()+'-'+(today.getMonth()+1))+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes();
			if(ival)defaults.value=ival;
            var p = $.extend(defaults, params);
			p.cols=[
				//年
				{values: initYears(p.maxYear,p.minYear)},
				//月
				{values: initMonthes},
				//日
				{values: getDays()},
				//分隔
				{divider: true,content: '  '},
				//时
				{values: initHours},
				//分隔
				{divider: true,content:':'},
				//分
				{values:initMinutes}
			];
			p.value=date2arr(p.value,today);
            $(this).picker(p);
            if (params.value)$(this).val(p.formatValue(p,p.value));
        });
    };

}(Zepto);
