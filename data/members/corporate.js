var fs = require( "fs" );

module.exports = {
	founding: require( "./founding" ),
	platinum: require( "./platinum" ),
	gold: require( "./gold" ),
	silver: require( "./silver" ),
	bronze: require( "./bronze" )
};

Object.keys( module.exports ).forEach(function( level ) {
	var members = module.exports[ level ];
	members.forEach(function( member ) {
		var path = __dirname + "/descriptions/" +
			member.name.toLowerCase().replace( /[^a-z0-9]/g, "" ) + ".html";
		member.description = fs.readFileSync( path, "utf8" );
	});
});
