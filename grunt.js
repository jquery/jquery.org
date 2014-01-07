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
		"travel-policy.md": "travel-policy.md",
		"team-members.md": "team-members.md",
		"board-members.md": "board-members.md",
		"mission.md": "mission.md"
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/**" )
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

		var content = new Buffer( file.content, file.encoding ).toString( "utf8" ),
			lines = content.split( "\n" ),
			title = lines.shift().substring( 2 );

		content =
			"<script>" + JSON.stringify({
				title: title,
				pageTemplate: "page-fullwidth.php"
			}, null, "\t" ) + "</script>\n" +
			lines.join( "\n" );

		grunt.file.write( dest, content );
		grunt.log.writeln( "Copied " + src + " from foundation repo." );
		done();
	});
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "clean lint build-pages build-members-page build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
