var MazeGame = function() {

  let WIDTH = 100
  let HEIGHT = 100
  let PROBABILITY = 0.1
  let BEGIN_POINT_MARK = 2
  let FINISH_POINT_MARK = 3
  let DIRECTION = {}
  DIRECTION.UP = 1
  DIRECTION.DOWN = 2
  DIRECTION.LEFT = 3
  DIRECTION.RIGHT = 4
  
  let obj = {}

  obj.map = {}

  obj.viewMap = []

  obj.width = WIDTH

  obj.height = HEIGHT

  obj.man = {}
  obj.man.x = 0
  obj.man.y = 0

  obj.playing = false
  obj.win = false

  let init = function(width, height) {
    obj.width = (width || WIDTH)
    obj.height = (height || HEIGHT)
    obj.map = initMap(width, height)
    setPoint()
    obj.playing = false
    obj.win = false
  }

  let begin = function() {
    obj.man.x = 0
    obj.man.y = 0
    obj.playing = true
    obj.viewMap = randerViewMap(obj.man.x, obj.man.y)
  }

  let guideDirection = function(direction) {
    switch(direction){
      case DIRECTION.LEFT: running(0, -1); break;
      case DIRECTION.RIGHT: running(0, 1); break;
      case DIRECTION.UP: running(-1, 0); break;
      case DIRECTION.DOWN: running(1, 0); break;
    }
  }

  let running = function(x, y) {
    if(obj.playing = false) {
      return
    }
    let target_x = obj.man.x + x
    let target_y = obj.man.y + y
    if(target_x < 0 || target_x >= obj.width || target_y < 0 || target_y >= obj.height) {
      return
    }else {
      if(obj.map[target_x][target_y] == 0) {
        return
      }else {
        obj.man.x = target_x
        obj.man.y = target_y
        obj.viewMap = randerViewMap(obj.man.x, obj.man.y)
        if(obj.map[target_x][target_y] == FINISH_POINT_MARK) {
          obj.win = true
          obj.playing = false
        }
      }
    }
  }

  let initMap = function(width, height) {
    let gameMap = []
    for(let i = 0 ; i < width ; i++) {
      gameMap[i] = []
      for(let j = 0 ; j < height ; j++) {
        gameMap[i][j] = probabilityWall(PROBABILITY)
      }
    }
    return gameMap
  }

  let setPoint = function() {
    obj.map[0][0] = BEGIN_POINT_MARK
    obj.map[obj.width - 1][obj.height - 1] = FINISH_POINT_MARK
  }

  let randerViewMap = function(man_at_x, man_at_y) {
    let viewMap = []
    for(let i = -1 ; i <= 1 ; i++) {
      viewMap[i + 1] = []
      for(let j = -1 ; j <= 1 ; j++) {
        let render_x = man_at_x + i
        let render_y = man_at_y + j
        if(render_x < 0 || render_x >= obj.width || render_y < 0 || render_y >= obj.height) {
          viewMap[i + 1][j + 1] = 0
        }else {
          viewMap[i + 1][j + 1] = obj.map[render_x][render_y]
        }
      }
    }
    return viewMap
  }

  let probabilityWall = function(probability) {
    return (randomNumber(10) + 1) > Math.floor(probability * 10) ? 1 : 0
  }

  // 返回 0 ~ range - 1 的随机整数
  var randomNumber = function(range) {
    return Math.floor(Math.random() * range)
  }

// obj.probabilityWall = probabilityWall

  // 打印地图
  // 单独测试通过，console.log 得很好看了
  let printMap = function(waittingPrintMap, options) {
    //console.log(waittingPrintMap)
    console.log('-----------------------------')
    for (var i = 0; i < waittingPrintMap.length; i++) {
      var line = '| '
      for (var j = 0; j < waittingPrintMap[i].length ; j++) {
        var aPos = String(waittingPrintMap[i][j])
        if(options && options[aPos]) {
          aPos = options[aPos]
        }
        line += aPos
        if (j < (waittingPrintMap[i].length - 1)) {
          // line += ' '
        }
      }
      line += ' |';
      line += 'line ' + i + ' :| '
      console.log(line)
    }
    console.log('-----------------------------')
  }
  
  obj.print = printMap
  obj.init = init
  obj.begin = begin
  obj.run = guideDirection

  return obj
}

// let mazeGame = MazeGame()
// mazeGame.init(100, 100)
// mazeGame.print(mazeGame.map, {0: '@', 1: '+'})
// mazeGame.begin()
// console.log(mazeGame.viewMap)
// mazeGame.print(mazeGame.viewMap, {0: '@', 1: '+'})
// mazeGame.run(2)
// console.log(mazeGame.viewMap)
// mazeGame.print(mazeGame.viewMap, {0: '@', 1: '+'})
// mazeGame.run(2)
// console.log(mazeGame.viewMap)
// mazeGame.print(mazeGame.viewMap, {0: '@', 1: '+'})
// mazeGame.run(2)
// console.log(mazeGame.viewMap)
// mazeGame.print(mazeGame.viewMap, {0: '@', 1: '+'})