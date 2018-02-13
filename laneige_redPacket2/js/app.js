// 动画序列帧
function s1_canvas (src, id, pageNum, callback) {
  var s1canavs = document.getElementById(id)
  var stage = new createjs.Stage(s1canavs)
  createjs.Ticker.setFPS(10)
  createjs.Ticker.addEventListener('tick', handleTick1)
  var pageIndex = 0
  function handleTick1 (event) {
    pageIndex++
    var page = new createjs.Bitmap(queue.getResult(src + pageIndex))
    if (pageIndex > pageNum) {
      createjs.Ticker.removeEventListener('tick', handleTick1)
      pageIndex = 0
      if (callback) {
        callback()
      }
    }
    stage.removeAllChildren()
    stage.addChild(page)
    stage.update()
  }
}
// 奖品动画序列帧
function gift_canvas (src, id, pageNum2, callback) {
  var s1canavs2 = document.getElementById(id)
  var stage2 = new createjs.Stage(s1canavs2)
  createjs.Ticker.setFPS(10)
  createjs.Ticker.addEventListener('tick', handleTick2)
  var pageIndex2 = 0
  function handleTick2 (event) {
    pageIndex2++
    var page2 = new createjs.Bitmap(queue.getResult(src + pageIndex2))
    if (pageIndex2 > pageNum2) {
      pageIndex2 = 0
      createjs.Ticker.removeEventListener('tick', handleTick2)
      if (callback) {
        callback()
      }
    }
    stage2.removeAllChildren()
    stage2.addChild(page2)
    stage2.update()
  }
}
// 领取样式切换
function getedStyle (params) {
  $('#s2 .icon').hide()
  $('#s2 .pos img').attr('src', 'images/lingqu.png')
  $('#s2 .cardbg2').css('background', 'url(images/shadow2.png) no-repeat')
}
function ungetedStyle (params) {
  $('#s2 .icon').show()
  $('#s2 .pos img').attr('src', 'images/shouxia.png')
  $('#s2 .cardbg2').css('background', 'none')
}
var imgArr = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']

// 随机生成卡券 
function toggle (params) {
  $('#s2 .cardbg').fadeIn()
  $('#s2 .card .replace').attr('src', 'images/' + imgArr[prize_id])
}

// 监听运动传感事件 
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false)
}else {
  alert('亲，你的浏览器不支持DeviceMotionEvent哦~')
}

// 获取加速度信息
// 通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
// 而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var giftNum = 0
var get = false
var shaked = false
var speed = 40 // speed
var x = y = z = lastX = lastY = lastZ = 0
function deviceMotionHandler (eventData) {
  var acceleration = eventData.accelerationIncludingGravity
  x = acceleration.x
  y = acceleration.y
  z = acceleration.z
  if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed || Math.abs(z - lastZ) > speed) {
    // 简单的摇一摇触发代码
    // shake++
    if (shaked) {
      return
    }else {
      if (!get) {
        _smq.push(['custom', 'page1 首页', '首页-摇一摇'])
        get_p()
        shaked = true
        TweenMax.to('#s1', 0.8, {autoAlpha: 0})
        TweenMax.to('#s2', 0.8, {autoAlpha: 1})
        if (window.screen.height >= 800) {
          var x = true
          isgift(x)
        }else {
          isgift()
        }
      }
    }
  }
  last_x = x
  last_y = y
  last_z = z
}

$('#s2 .rule').click(function (params) {
  _smq.push(['custom', 'page活动规则', '点击活动规则'])
  $('.rule_box').fadeIn()
})
$('.rule_box .close_btn').click(function (params) {
  $('.rule_box').fadeOut()
})
function allgeted (params) {
  TweenMax.to('#s2', 0.8, {autoAlpha: 1})
  var value = parseInt(Math.floor(Math.random() * 7))
  $('#s2 .youku').fadeOut()
  $('#s2 .bigRed').fadeOut()
  getedStyle()
  $('#s2 .cardbg').fadeIn()
  $('#s2 .card .replace').attr('src', 'images/' + imgArr[value])
}
// 点击在摇一次
var prize_id
var limitNum = 8
// var endNum=
$('#s2 .again').click(function (params) {
  _smq.push(['custom', 'page2礼品页', '点击再试试手气返回上一页重新互动'])
  if (giftNum >= limitNum) {
    var value = parseInt(Math.floor(Math.random() * 5))
    $('#s2 .youku').fadeOut()
    $('#s2 .bigRed').fadeOut()
    getedStyle()
    $('#s2 .cardbg').fadeIn()
    $('#s2 .card .replace').attr('src', 'images/' + imgArr[value])
  }else {
    if (get) {
      return
    }else {
      ungetedStyle()
      // 测试随机
      radoms = parseInt(Math.floor(Math.random() * 10))
      prize_id = 8
      $('#s2 .cardbg').fadeOut()
      $('#s2 .youku').fadeOut()
      $('#s2 .bigRed').fadeOut()
      TweenMax.to('#s2', 0.8, {autoAlpha: 0})
      TweenMax.to('#s1', 0.8, {autoAlpha: 1})
      shaked = false
      canGet = true
    }
  }
})
$('#s2 .share_btn').click(function (params) {
  _smq.push(['custom', 'page2礼品页', '点击红运接力进入分享页'])
  TweenMax.to('#share', 0.8, {autoAlpha: 1})
  TweenMax.to('#s2', 0.8, {autoAlpha: 0})
  if (window.screen.height >= 800) {
    s1_canvas('shareX_', 'share_canavs', 31)
  }else {
    s1_canvas('shareS_', 'share_canavs', 31)
  }
})

// 点击领取icon
var canGet = true
$('#s2 .cardbg .check').click(function name (params) {
  // submit()
  if (canGet == true) {
    giftNum++
    _smq.push(['custom', 'page2优惠券页', '点击收下红运礼放入卡券'])
  }
  canGet = false
  getedStyle()
  get = false
})

$('#s2 .bigRed .redpacget').click(function name (params) {
  // submit()
  _smq.push(['custom', 'page2红包页', '点击收下TA收到红包推送'])
  $('#s2 .bigRed .redpacget p').text('已领取')
  if (canGet == true) {
    giftNum++
  }
  canGet = false
  $('#s2 .bigRed  .icon').fadeOut()
  get = false
})
// 长按保存 优酷卡领取
// var obj = $('#s2 .youku .con')[0]
// var startTime = 0; // 记录起始事件
// var isMove = false; // 记录是否移动
// obj.addEventListener('touchstart', function () {
//   startTime = Date.now(); // 获取当前时间戳
// })
// obj.addEventListener('touchmove', function () {
//   isMove = true; // 记录移动
// })
// obj.addEventListener('touchend', function (e) {
//   // 判断是否满足点击的条件
//   if (!isMove && Date.now() - startTime > 500) {
//     // tap点击事件触发
//     get = false
//     giftNum++
//   }
//   // 数据重置
//   isMove = false
//   startTime = 0
// })
// 生成优酷卡片
function creatYoukuCard (params) {
  var cardNuminit = 8888888999999
  var cardSecinit = 234567
  var cardsrc = 'canvas_'
  var cardsrcnum = 1
  var cardNum = '卡号：' + cardNuminit + '\n密码：' + cardSecinit
  var canvas = new fabric.Canvas('youkucard')
  fabric.Image.fromURL('images/youku.png', function (oImg) {
    canvas.add(oImg).renderAll()
    var textbox = new fabric.Text(cardNum, {
      left: 173,
      top: 153,
      width: 600,
      fontSize: 18,
      fontFamily: '宋体 SimSun',
      fill: '#efc991',
      textAlign: 'center'
    })
    textbox.left = (500 - textbox.width) / 2
    canvas.add(textbox)
    var submit_img = canvas.toDataURL('image/jpeg', 1)
    $('#s2 .youku .creatimg').attr('src', submit_img)
  })
}

// 判断出现的哪个礼物
function isgift (x) {
  prize_id = 7
  console.log(prize_id)
  // x的内容
  if (x) {
    switch (true) {
      case prize_id <= 5:
        gift_canvas('cardX_', 's2_canavs', 20, function name (params) {
          toggle()
        })
        break
      // youku
      case prize_id == 6:
        gift_canvas('youkuX_', 's2_canavs', 20, function name (params) {
          $('#s2 .youku').show()
          // submit()
          creatYoukuCard()
          get = false
          giftNum++
        })
        break
      // 红包
      case prize_id == 7:
        gift_canvas('redPacketX_', 's2_canavs', 30, function name (params) {
          $('#s2 .bigRed').fadeIn()
        })
        break
    }
  }else {
    switch (true) {
      case prize_id <= 5:
        gift_canvas('cardS_', 's2_canavs', 20, function name (params) {
          toggle()
        })
        break
      // youku
      case prize_id == 6:
        gift_canvas('youkuS_', 's2_canavs', 20, function name (params) {
          $('#s2 .youku').show()
          // submit()
          creatYoukuCard()
          get = false
          giftNum++
        })
        break
      // 红包
      case prize_id == 7:
        gift_canvas('redPacketS_', 's2_canavs', 30, function name (params) {
          $('#s2 .bigRed').fadeIn()
        })
        break
    }
  }
  get = true
}

// 请求奖品
var getajax_p = true
function getajax () {
  if (getajax_p) {
    getajax_p = false
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: {
        isreceive: true
      },
      success: function (data) {
        if (data.status == 1) {
          prize_id = data.type
          cardNuminit = data.user
          cardSecinit = data.password
        }else {
          alert(data.msg)
        }
        getajax_p = true
      },
      error: function () {
        alert('网络繁忙')
        getajax_p = true
      }
    })
  }
}

//提交随机
var get_p = true
function get_p () {
  // 提交表单
  if (get_p) {
    get_p = false
    $.ajax({
      url: "{:U('Index/saveInfo')}",
      type: 'post',
      dataType: 'json',
      data: {
        isreceive: true
      },
      success: function (data) {
        get_p = true
      },
      error: function () {
        alert('网络繁忙')
        get_p = true
      }
    })
  }
}
