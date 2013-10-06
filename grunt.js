module.exports = function( grunt ) {

"use strict";

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	clean: {
		folder: "dist/"
	},
	htmllint: {
		page: "pages/*.html"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "pages/*.html",
			tasks: "deploy"
		}
	},
	"copy-foundation-docs": {
		"travel-policy.md": "travel-policy.md"
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/**/*.html" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

grunt.registerMultiTask( "copy-foundation-docs", "", function() {
	var github = require( "github-request" ),
		done = this.async(),
		src = this.file.src,
		dest = "pages/" + this.file.dest,
		token = grunt.config( "wordpress.githubToken" );

	if ( !token ) {
		grunt.log.error( "Missing githubToken in config.json" );
		return done( false );
	}

	github.request({
		headers: {
			Authorization: "token " + token
		},
		path: "/repos/jquery/foundation/contents/documents/" + src
	}, function( error, file ) {
		if ( error ) {
			grunt.log.error( error );
			return done( false );
		}

		grunt.file.write( dest, new Buffer( file.content, file.encoding ).toString( "utf8" ) );
		grunt.log.writeln( "Copied " + src + " from foundation repo." );
		done();
	});
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "clean lint build-pages build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
