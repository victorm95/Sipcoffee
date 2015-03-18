module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		express: {
			dev: {
				options: {
					script: 'server.js'
				}
			}
		},
		watch: {
			server: {
				options: {
					spawn: false
				},
				files: ['**/*.js'],
				tasks: ['express:dev']
			}
		}
	});

	grunt.registerTask('server', ['express:dev', 'watch']);
};
