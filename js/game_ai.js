function GameAI( game_manager ){
    self = this
    self.gm = game_manager

    var random_move = function(){
	var value = Math.floor( Math.random() * 10 ) % 4
	self.gm.move(value)
	if( self.gm.over ) self.stop()
    }
    
    var moveTile2Cell = function(grid,tile,cell){
	grid.cells[tile.x][tile.y] = null;
	grid.cells[cell.x][cell.y] = tile;
	tile.updatePosition(cell);
    }


    var apply_move = function( direction ){
	var gridser = self.gm.grid.serialize()
	var grid = new Grid( self.gm.size , gridser.cells  )
	if ( self.gm.isGameTerminated() ) return grid
	
	var cell, tile;
	var vector = self.gm.getVector( direction );
	var traversals = self.gm.buildTraversals( vector );
	
	grid.eachCell( function( x,y,tile){
	    if( tile ){
		tile.mergedFrom = null;
		tile.savePosition();
	    }
        });
	
	traversals.x.forEach( function(x){
	    traversals.y.forEach( function(y){
		cell = { x:x, y:y };
		tile = grid.cellContent(cell);
		if( tile ){
		    var positions = self.gm.findFarthestPosition(cell,vector);
		    var next      = grid.cellContent(positions.next)
		    
		    if( next && next.value === tile.value &&  !next.mergedFrom ){
			var merged = new Tile(positions.next, tile.value*2);
			merged.mergedFrom = [tile,next];
			grid.insertTile(merged);
			grid.removeTile(tile);
			
			tile.updatePosition(positions.next);
		    }
		    else{
			moveTile2Cell( grid, tile, positions.farthest );
		    }
		}
            });
        });
	
	return grid;
    }
    
    var score_grid = function( grid ,d ){
	var cell_count = 0;
	var tile_match = 0;
	var tile;
	var cell;
	for( var x=0; x<grid.size; x++ ){
	    for( var y=0; y<grid.size; y++ ){
		cell = {x:x,y:y};
		if( grid.cellAvailable(cell) ) {
		    cell_count ++;
		    continue;
		}
		tile = grid.cellContent(cell)
		
		if( tile ){
		    //for( var direction =0 ; direction < 4; direction++ ){
			var vector = self.gm.getVector( d );
			var cell2  = { x:x+vector.x, y:y+vector.y };
			var other  = grid.cellContent(cell2);
			if( other && other.value === tile.value ){
			    tile_match ++;
			}
                    //}
                }
             }
        }
	
	return {c:cell_count,t:tile_match}
    }
    
    var greedy_move = function(){
	//max available matches
	//max cell available
	var scores = []
	for( var d=0; d<4; d++ ){
	    var fake_grid = apply_move(d)
	    scores.push( score_grid(fake_grid,d) )
	}
	
	var maxd = 0;
	var max_score = { c:0, t:0 }
	var min_score = { c:1000, t:1000 }
	
	for( var d=0; d<4; d++ ){
	    var s = scores[d];
	    if( s.t>=max_score.t && s.c >= max_score.c ){
		max_score = s;
		maxd = d;
	    }
	    if( s.t<=min_score.t && s.c <= min_score.c ){
		min_score = s;
	    }
        }
	
	if( max_score.t == min_score.t && max_score.c == min_score.c ){
	    //in case it get stuck
	    maxd = Math.floor( Math.random() * 10 ) % 4
	}

	self.gm.move(maxd)
	if( self.gm.over ) self.stop()

    }
    
    
    
    self.begin = function(){
        self.timer = setInterval( random_move, 1000 ) 
    }
    self.begin_ai2 = function(){
        self.timer = setInterval( greedy_move, 100 ) 
    }
    self.stop  = function(){
	clearInterval( self.timer )
    }
}
