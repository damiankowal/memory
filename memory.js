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
        this.resolved = false;
    };

    Tile.prototype.hide = function () {
        this.$el.removeClass( "flipped" );
    }
    Tile.prototype.remove = function () {
        this.$el.remove();
        this.isResolved = true;
    }

    Tile.prototype.flip = function() {
        var resultHandler;
        this.$el.addClass('flipped');
        flippedTiles.push( this );
        if ( flippedTiles.length > 1 ) {
            window.console.log( flippedTiles );
            if ( flippedTiles[ 0 ].value === flippedTiles[ 1 ].value ) {
                window.console.log( "match" );
                resultHandler = function() {
                    $.each( flippedTiles, function() {
                        this.remove();
                    });
                };
            } else {
                window.console.log( "no match" );
                resultHandler = function() {
                    $.each( flippedTiles, function() {
                        this.hide();
                    });
                };
            }
            window.setTimeout( function() {
                $.each( flippedTiles, resultHandler );
                flippedTiles = [];
                if ( gameOver() ) {
                    window.console.log( "game over" )
                }
            }, 1000 );
        }
    };

    function gameOver() {
        var status = true;
        $.each( tiles, function () {
            if ( !this.isResolved ) {
                status = false;
            }
        })
        return status;
    }

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