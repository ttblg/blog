 module.exports = function(grunt) {
	//���ò���
	grunt.initConfig({
	 pkg: grunt.file.readJSON('package.json'),
	 //�ϲ�
	 concat: {
		 options: {
			 banner: '/** \n <%=pkg.name%> <%=pkg.version%>\n Author:<%=pkg.author%>\n HomePage:<%=pkg.homepage%>\n */\n',
			 separator: ';',
			 stripBanners: true
		 },
		 dist: {
			 src: [
				 "src/js/init.js",
				 "src/js/fastClick.js",
				 'src/js/zepto-adapter.js',			
				 'lib/JRoll/jroll.js',				//�������
				 'src/plus/Scroller/scroller.js',	//���·�װ�Ĺ������
				 "src/js/layer.js"					//����
			 ],
			 dest: "dist/js/kui.js"
		 }
	 },
	 
	 //���JS�﷨
	 jshint: {
            files: ['src/js/*.js','src/plus/*/*.js'],
			//files: ['dist/js/kui.min.js'],
            options: {
                // ��������ַ�ƴ��, �� *.tpl �г���
                "multistr": true,
                // ����ʹ���������ֱ��ʽ $.isFunction( fn ) && fn();
                "expr": true,
                // ����ʹ���������ֺ���  new Function("obj","return 123")
                "evil": true
            }
        },
	 //ѹ��
	 uglify: {
		 zepto: {
			 options: {
				 banner: '/* Zepto */\n'
			 },
			 src: [
				'lib/zepto/zepto.js',
				'lib/zepto/event.js',
				'lib/zepto/touch.js', 
				'lib/zepto/ajax.js',
				'lib/zepto/fx.js',
				'lib/zepto/form.js'
			],
			 dest: 'lib/zepto.min.js'
		 },
		 kui: {
			 options: {
				 banner: '/** \n <%=pkg.name%> <%=pkg.version%>\n Author:<%=pkg.author%>\n HomePage:<%=pkg.homepage%>\n */\n'
			 },
			 files: {
				 'dist/js/kui.min.js': 'dist/js/kui.js'
			 }
		 },
		 //Scroller
		 Scroller:{
			 options: {
				 banner: '/* Scroller Based JRoll.js */\n'
			 },
			src:['lib/JRoll/jroll.js','src/plus/Scroller/scroller.js'],
			dest:'dist/plus/scroller.min.js'
		 },
		 //zepto+kui������
		 kuicomplit:{
			 options: {
				 banner: '/** \n <%=pkg.name%> <%=pkg.version%>\n Zepto + Scroller + Kui \n Author:<%=pkg.author%>\n HomePage:<%=pkg.homepage%>\n */\n'
			 },
			src:['lib/zepto.min.js','dist/js/kui.js'],
			dest:'dist/js/kui.all.min.js'
		 },
		 
		//ѡ�����ѹ��
		 Picker: {
			 options: {
				 banner: '/** \n Picker v1.2.0 */\n'
			 },
			 files: {
				 'dist/plus/Picker/picker.min.js': ['src/plus/Picker/picker.js','src/plus/Picker/datetime-picker.js'],
				 'dist/plus/Picker/city-picker.min.js': ['src/plus/Picker/city-data.js','src/plus/Picker/city-picker.js'],
			 }
		 },
		 //�������ѹ��
		 Calendar: {
			 options: {
				 banner: '/** \n Calendar v1.2.0 */\n'
			 },
			 files: {
				 'dist/plus/Calendar/calendar.min.js': 'src/plus/Calendar/calendar.js',
			 }
		 },
	 },
	 //Less����
	 less:{
		 development:{
			 options: {
				banner: '/** \n <%=pkg.name%> <%=pkg.version%>\n Zepto + Scroller + Kui \n Author:<%=pkg.author%>\n HomePage:<%=pkg.homepage%>\n */\n',
				paths: ['assets/css']
			 },
			 files:{
				 'dist/css/kui.css':['src/less/kui.less'],
			 }
			 /*[{
				 expand: true,
				 cwd: "src/less",
				 src: ["kui.less"],
				 dest: "dist/css/",
				 ext: '.css'
			 }]*/
			
		 },
		 plus:{
			 options: {
				paths: ['assets/css']
			 },
			 files:{
				 //���Less
				 'dist/plus/calendar/calendar.css':'src/plus/Calendar/calendar.less',
				 'dist/plus/picker/picker.css':'src/plus/Picker/picker.less',
				 'dist/css/icon_ext.css':'src/less/icon_ext.less',
			 }
		 }
	 },
	 //CSSѹ��
	 cssmin: {
		 options: {
			 keepSpecialComments:0
		 },
		 kui: {
			 files: {
				 "dist/css/kui.min.css": ["dist/css/kui.css"],
			 }
		 },
		 //���CSSѹ��
		 plus: {
			 files: {
				 "dist/plus/calendar/calendar.min.css": ["dist/plus/calendar/calendar.css"],
				 "dist/plus/picker/picker.min.css": ["dist/plus/picker/picker.css"],
				 "dist/css/icon_ext.min.css": ["dist/css/icon_ext.css"],
			 }
		 }
	 }
	});

	//����concat��uglify������ֱ���ںϲ���ѹ��
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


  //ע������
  grunt.registerTask('default', ['concat', 'uglify','jshint','less','cssmin']);
}