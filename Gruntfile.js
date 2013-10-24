module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
			  separator: ';',
			},
			dist: {
			  src: ['src/tarsier.js', 'src/ga_handlers.js'],
			  dest: 'build/all.js',
			}
		},
		uglify: {
		  options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  build: {
	        src: 'build/all.js',
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
		},
		watch: {
		  scripts: {
			files: ['src/*.js'],
			tasks: ['default'],
			options: {
			  spawn: false,
			},
		  },
		},
		'http-server': {
	        'dev': {
	                // the server root directory
	                root: "./build/",
	                port: 8000,
	                host: "10.6.6.207",
	                showDir : true,
	                autoIndex: true,
	                defaultExt: "html",
	                //wait or not for the process to finish
	                runInBAckground: false    
	            }
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.registerTask('default', ['concat', 'uglify']);
};

