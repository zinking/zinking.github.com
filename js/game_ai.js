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
	
	var moved = false;
	
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

		    if( !self.gm.positionsEqual( cell,tile)){
			moved = true;
		    }
		}
            });
        });
	
	return {g:grid,m:moved};
    }
    var center_score = function( grid ,d , moved){
	var cell_count = 0;
	var center_score = 0;
	var tile;
	var cell;
	for( var x=0; x<grid.size; x++ ){
	    for( var y=0; y<grid.size; y++ ){
		cell = {x:x,y:y};
		if( grid.cellAvailable(cell) ) {
		    cell_count ++;
		}
		tile = grid.cellContent(cell)
		if( tile ){
		    var d0 = grid.size/2;
		    var ds = Math.pow( x-d0, 2 ) + Math.pow( y-d0, 2 )
		    center_score = ds*tile.value
                }
             }
        }
	
	return {d:d,c:cell_count,t:center_score, m:moved}
    }
    
    var greedy_score = function( grid ,d , moved){
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
	
	return {d:d,c:cell_count,t:tile_match,m:moved}
    }
    
    var select_move = function( score_func){
	//max available matches
	//max cell available
	var scores = [];
	
	for( var d=0; d<4; d++ ){
	    var r = apply_move(d);
	    var fake_grid = r.g;
	    var moved =r.m;
	    scores.push( score_func(fake_grid,d, moved) );
	}
	
	function compare_score( sl, sr ){
	    if( sl.t >= sr.t && sl.c >= sr.c ) return -1;
	    else if ( sl.c > sr.c ) return -1;
	    return 1;
	}
	
	scores.sort( compare_score );

	for( var d=0; d<4; d++ ){
	    var r= scores[d];
	    if( r.m ) {
		self.gm.move( r.d );
		break;
	    }
	}
	
	//self.gm.move(maxd)
	if( self.gm.over ) self.stop();
    }

    
    
    self.begin = function(){
        self.timer = setInterval( random_move, 1000 ) 
    }
    self.begin_ai2 = function(){
        self.timer = setInterval( function(){ select_move(greedy_score) } , 300 ) 
        //self.timer = setInterval( function(){ select_move(center_score) } , 300 ) 
    }
    self.stop  = function(){
	clearInterval( self.timer )
    }
    
    self.toggle_ai = function ( dom ){
	if( dom.dataset['start'] && dom.dataset['start'] == 'y' ){//if started
	    self.stop()
	    dom.dataset['start'] = 'n' 
	}
	else{
	    clearInterval( self.timer )
	    self.begin_ai2()
	    dom.dataset['start'] = 'y' 
	}
    }
}
