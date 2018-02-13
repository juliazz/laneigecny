if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
  var version = parseFloat(RegExp.$1)
  if (version > 2.3) {
    var phoneScale = parseInt(window.screen.width) / 640
    document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">')
  }else {
    document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">')
  }
}else {
  document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">')
}
/*********************************************
Preload 预加载图片
**********************************************/
var queue = new createjs.LoadQueue()
var loadImgList = []
function getNum (num, imgsrc) {
  // var prefix = "images/step4/page7_"
  var prefix = imgsrc
  var src = ''
  num = num + ''
  if (num.length == 1) {
    src = prefix + '0000' + num
  }else if (num.length == 2) {
    src = prefix + '000' + num
  }else if (num.length == 3) {
    src = prefix + '00' + num
  }
  return src
}
function getStr (num, id_prefix, endnum, imgsrc, style) {
  var count = 0
  for (var i = num;i < endnum;i++) {
    count++
    var str = {id: '' + id_prefix + count + '',src: '' + getNum(i, imgsrc) + style}
    loadImgList.push(str)
  }
}

/*********************************************
 drawFrame 
 **********************************************/
function drawFrame (ctx, image, width, height, num) {
  var offsetY = 0,
    offsetX = 0
  ctx.clearRect(offsetX, offsetY, width, height)
  ctx.drawImage(image, offsetX, offsetY, width, height, 0, 0, width, height)
}
/*********************************************
 rightNow 
 **********************************************/
function rightNow () {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']()
  } else {
    return +(new Date())
  }
}

function preload () {
  // 首页动画帧
  if (window.screen.height >= 800) {
    getStr(0, 'homeX_', 32, ImgPath + '/X/home/home1290_', '.jpg')
    getStr(0, 'cardX_', 20, ImgPath + '/X/card/card1290_', '.jpg')
    getStr(0, 'youkuX_', 20, ImgPath + '/X/youku/aiqiyi1290_', '.jpg')
    getStr(0, 'redPacketX_', 30, ImgPath + '/X/hongbao/hongbao1290_', '.jpg')
    getStr(0, 'shareX_', 28, ImgPath + '/X/share/share－1290_', '.png')
  }else {
    getStr(0, 'homeS_', 32, ImgPath + '/S/home/home1080_', '.jpg')
    getStr(0, 'cardS_', 20, ImgPath + '/S/card/card1080_', '.jpg')
    getStr(0, 'youkuS_', 20, ImgPath + '/S/youku/aiqiyi1080_', '.jpg')
    getStr(0, 'redPacketS_', 30, ImgPath + '/S/hongbao/hongbao_', '.jpg')
    getStr(0, 'shareS_', 28, ImgPath + '/S/share/share_', '.png')
  }
  queue.on('progress', handleLoadStart)
  queue.on('complete', handleComplete)
  queue.setMaxConnections(5)
  queue.loadManifest(loadImgList)
}

function handleLoadStart (event) {
  // document.getElementById("loading_text").innerHTML = Math.floor(queue.progress * 100) + "%"
}
console.log('99999');
function handleComplete () {
  TweenMax.set('#s1', {autoAlpha: 1})
  
  if (window.screen.height >= 800) {
    // if (allget) {
    //   TweenMax.to('#s2', 0.8, {autoAlpha: 1})
    //   allgeted()
    // }else {
      // s1_canvas('homeX_', 's1_canavs', 32)
      // 测试进入第二页
      TweenMax.to('#s1', 0.8, {autoAlpha: 0})
      TweenMax.to('#s2', 0.8, {autoAlpha: 1})
      var x = true
      isgift(x)
    // }
  }else {
    // if (allget) {
    //   TweenMax.to('#s2', 0.8, {autoAlpha: 1})
    //   allgeted()
    // }else if (!allget) {
      // s1_canvas('homeS_', 's1_canavs', 32)
      // 测试进入第二页
      TweenMax.to('#s1', 0.8, {autoAlpha: 0})
      TweenMax.to('#s2', 0.8, {autoAlpha: 1})
      isgift()
    // }
  }
}
