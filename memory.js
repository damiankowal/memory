$( document ).ready(function() {

    var board = $( "#board" ),
        boardSections = $( "#board td" ),
        tiles = [],
        tokens = [ "A", "B" ];

    var Tile = function(val){
        this.value = val;
        this.$el = $('<span>' + val + '</span>');
        this.$el.on('click', this.flip.bind(this));
    };

    Tile.prototype.flip = function(){
        this.$el.toggleClass('flipped');
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