$( document ).ready(function() {

    var board = $( "#board" ),
        boardSections = $( "#board td" ),
        tiles = [],
        tokens = [ "A", "B" ],
        flippedTiles = [];

    var Tile = function(val){
        this.value = val;
        this.$el = $('<span>' + val + '</span>');
        this.$el.on('click', this.flip.bind(this));
    };

    Tile.prototype.hide = function () {
        this.$el.removeClass( "flipped" );
    }

    Tile.prototype.flip = function() {
        this.$el.addClass('flipped');
        flippedTiles.push( this );
        if ( flippedTiles.length > 1 ) {
            window.console.log( flippedTiles );
            if ( flippedTiles[ 0 ].value === flippedTiles[ 1 ].value ) {
                window.console.log( "match" );
            } else {
                window.console.log( "no match" );
            }
            window.setTimeout( function() {
                $.each( flippedTiles, function() {
                    this.hide();
                });
                flippedTiles = [];
            }, 1000 );
        }
    };

    // Create a tile for each token
    for ( var i = 0, l = tokens.length; i < l; i += 1 ) {
        for ( var j = 0; j < 2; j += 1 ) {
            tiles.push( new Tile( tokens[i] ) );
        }
    }

    $( boardSections ).each( function( index, element ){
        $( this ).append( tiles[ index ].$el );
    });

});