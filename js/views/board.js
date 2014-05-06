var app = app || {};

app.BoardView = Backbone.View.extend({
    el: '#board',

    initialize: function( options ) {
        this.collection = new app.Tiles( options.initialTiles );
        _.bindAll( this, 'tileSelection' );
        app.gameController.bind( 'tileSelection', this.tileSelection );
        this.render();
    },

    // render tiles by rendering each tile in its collection
    render: function() {
        var items = [];
        this.collection.each(function( item ) {
            items.push( item );
        });

        // put the tiles in random order
        items = _.shuffle( items );

        _.each( items, function( item ) {
            this.renderTile( item );
        }, this );
    },

    renderTile: function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    },

    tileSelection: function( tile ) {
        var selectedTiles;
        if ( ! ( tile.get( 'flipped' ) || tile.get( 'resolved' ))) {
            tile.toggleFlip();
            selectedTiles = this.collection.where({
                flipped: true,
                resolved: false
            });
            if ( selectedTiles.length === 2 ) {
                this.handleTurn( selectedTiles );
            }
        }
    },

    handleTurn: function( tiles ) {
        var a = tiles[0],
            b = tiles[1],
            resultHandler;
        if ( a.get( 'value' ) === b.get( 'value' ) ){
            console.log( 'match!' );
            resultHandler = function( tile ) {
                tile.set( 'resolved', true );
            };
        } else {
            console.log( 'no match!');
            resultHandler = function( tile ) {
                tile.toggleFlip();
            };
        }
        _.each( tiles, resultHandler );
        this.checkGameStatus();
    },

    allTilesResolved: function() {
        return this.collection.resolvedCount() === this.collection.totalCount()
    },

    checkGameStatus: function() {
        if ( this.allTilesResolved() ) {
            this.endGame();
        }
    },

    endGame: function() {
        console.log( 'you win!' );
    }

});