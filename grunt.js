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

grunt.registerTask( "build-members-page", function() {
	var memberContent,
		members = require( "./data/members" ),
		path = grunt.config( "wordpress.dir" ) + "/posts/page/members.html",
		content = grunt.file.read( path );

	memberContent = Object.keys( members.corporate ).map(function( level ) {
		var prettyLevel = level.replace( /^\w/, function( character ) {
			return character.toUpperCase();
		}) + " Members";

		return "<h2 class='block'>" + prettyLevel + "</h2>\n" +
			members.corporate[ level ].map(function( member ) {
				var logoPath = "/resources/members/" +
					member.name.toLowerCase().replace( /[^a-z0-9]/g, "" ) + ".png";

				return "" +
					"<div class='row'>\n" +
						"<div class='four mobile columns'>\n" +
							"<a href='" + member.url + "'>\n" +
								"<img src='" + logoPath + "'>\n" +
							"</a>\n" +
						"</div>\n" +
						"<div class='eight mobile columns'>\n" +
							member.description +
						"</div>\n" +
					"</div>";
			}).join( "\n" );
	}).join( "\n" );

	content = content.replace( "{{corporate-members}}", memberContent );
	grunt.file.write( path, content );
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "clean lint build-pages build-members-page build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
