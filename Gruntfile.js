module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
			  separator: ';',
			},
			dist: {
			  src: ['src/tarsier.js', 'src/ga_variables.js', 'src/ga_handlers.js'],
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat', 'uglify']);
};

