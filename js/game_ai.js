function GameAI( game_manager ){
    self = this
    self.gm = game_manager

    var random_move = function(){
	var value = Math.floor( Math.random() * 10 ) % 4
	self.gm.move(value)
    }
    
    self.begin = function(){
        self.timer = setInterval( random_move, 500 ) 
    }
    self.stop  = function(){
	clearInterval( self.timer )
    }
}
