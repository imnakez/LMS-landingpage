# Grunt Configuration
# http://gruntjs.com/getting-started#an-example-gruntfile

module.exports = (grunt) ->

# Initiate the Grunt configuration.
	grunt.initConfig

# Allow use of the package.json data.
		pkg: grunt.file.readJSON('package.json')

# docpad variables
		docpad:
			files: ['./src/**/*.*']
			out: ['out']
			#options:
				#ignoreCustomPatterns: true

# compile less and generate map files
		less:
			dev:
				options:
					strictMath: true
					sourceMap: true
				files: [
					'out/styles/styles.css': 'src/render/styles/styles.inc.less'
				]
# minify css
		cssmin:
			options:
				sourceMap: true
			target:
				files: [
					'out/styles/styles.min.css': 'out/styles/styles.css'
				]
# add vendor prefixes
		postcss:
			options:
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24',
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				],
				processors: [
					require('pixrem')(),
					require('cssnext')(),
					require('cssnano')()
				]
			src:
				options:
					map: true
				src: 'src/render/styles/styles.inc.less'
			out:
				options:
					map: true
				src: 'out/styles/styles.css'

		copy:
			main:
				files: [
					'out/favicon.ico': 'src/render/img/favicon.inc.ico',
					'out/favicon.png': 'src/render/img/favicon.inc.png'
				]

# track changes in src dir and regenerate docpad
		watch:
			src:
				files: ['<%= docpad.render %>']
				tasks: [
					'shell:docpad',
					'postprocess'
				]
			out:
				files: ['<%= docpad.out %>/*.*']
				options:
					livereload: true
			less:
				files: ['src/render/styles/styles.inc.less']
				tasks: [
					'postprocess',
				]

# start server
		connect:
			server:
				options:
					port: 9800
					hostname: '*'
					base: '<%= docpad.out %>'
					livereload: true
# open: true

# clean out dir
		clean:
			options:
				force: true
			out: ['<%= docpad.out %>']
			less:
				'out/styles'

# generate development
		shell:
			docpad:
				options:
						stdout: true
						async: false
				command: 'docpad generate --env static'
			run:
				options:
						stdout: true
						async: true
				command: 'docpad run'
			deploy:
				options:
						stdout: true
						async: false
				command: 'docpad deploy-ghpages --env static'

	# Build the available Grunt tasks.
	grunt.loadNpmTasks 'grunt-shell-spawn'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-connect'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-postcss'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-imagemin'
	grunt.loadNpmTasks 'grunt-modernizr'
	grunt.loadNpmTasks 'grunt-postcss'
	grunt.loadNpmTasks 'grunt-cssnext'
	grunt.loadNpmTasks 'grunt-cssnano'
	grunt.loadNpmTasks 'grunt-pixrem'

	# Register our Grunt tasks.
	grunt.registerTask 'preprocess',	[]
	grunt.registerTask 'prepare',			[]
	grunt.registerTask 'postprocess', ['less', 'postcss:out']
	grunt.registerTask 'generate',		['clean:out', 'shell:docpad', 'preprocess', 'prepare', 'postprocess']
	grunt.registerTask 'server',			['connect', 'watch:src', 'watch:out']
	grunt.registerTask 'run2',				['generate', 'server']
	grunt.registerTask 'run',					['shell:run', 'postprocess', 'clean:out', 'copy', 'watch:less']
	grunt.registerTask 'development', ['preprocess', 'prepare', 'postprocess', 'watch:less']
	grunt.registerTask 'production',	['preprocess', 'prepare', 'postprocess']
	grunt.registerTask 'deploy',			['clean:out', 'preprocess', 'prepare', 'postprocess', 'shell:deploy']
	grunt.registerTask 'default',			['run']
