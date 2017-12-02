let mazeGame = MazeGame()

var bus = new Vue()

bus.$on('begin', function() {
  playVUE.onBeginButtonClick()
})

bus.$on('win', function() {
  messageVUE.onGameWin()
})

var buttonVUE = new Vue({
  el: '#begin',
  methods: {
    onPlayingButtonClick: function() {
      mazeGame.init()
      mazeGame.begin()
      bus.$emit('begin')
    }
  }
})

var playVUE = new Vue({
  el: '#play',
  data: {
    viewMap: [],
    direction: 0
  },
  computed: {
    directionShow: function() {
      switch(this.direction){
        case 0: return 'O'; break;
        case mazeGame.DIRECTION.UP: return '^'; break;
        case mazeGame.DIRECTION.DOWN: return 'v'; break;
        case mazeGame.DIRECTION.LEFT: return '<'; break;
        case mazeGame.DIRECTION.RIGHT: return '>'; break;
        defalut: return 'O';
      }
    }
  },
  methods: {
    onBeginButtonClick: function() {
      this.viewMap = mazeGame.viewMap
    },
    onPlayBlockClick: function(x, y) {
      let direction_x = x - 1
      let direction_y = y - 1
      if(direction_x > 0) {
        mazeGame.run(mazeGame.DIRECTION.RIGHT)
      }
      if(direction_x < 0) {
        mazeGame.run(mazeGame.DIRECTION.LEFT)
      }
      this.viewMap = mazeGame.viewMap
      if(direction_y < 0) {
        mazeGame.run(mazeGame.DIRECTION.UP)
      }
      if(direction_y > 0) {
        mazeGame.run(mazeGame.DIRECTION.DOWN)
      }
      this.viewMap = mazeGame.viewMap
      this.direction = mazeGame.man.direction
      if(mazeGame.win) {
        bus.$emit('win')
      }
    }
  }
})

var messageVUE = new Vue({
  el: '#message',
  data: {
    is_win: false,
    bonus: 0
  },
  methods: {
    onGameWin: function() {
      this.is_win = true
    },
    onMessageClick: function() {
      this.bonus += 1
      if(this.bonus == 10) {
        window.location.href = "./image/bonus.jpg"
      }
    }
  }
})