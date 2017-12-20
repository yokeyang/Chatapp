var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')
const path = require('path')
server.listen(3002)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.resolve(__dirname, '.', 'build')));
app.use(express.static('./node_modules'));
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-origin','http://localhost:5001');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods','GET,POST');
  next();
});

var user = [
  {name:'Yoke',psd:'123'},
  {name:'Peter',psd:'1234'},
  {name:'Anna',psd:'12345'}
]

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'));
})

app.post('/login',(req,res)=>{
  var name = req.body.name
  var psd = req.body.psd
  if(user.find(ele => {if(ele.name === name && ele.psd === psd){return true}})){
    console.log('ok')
    res.json({ok:1})
  }else{
    console.log('error')
    res.json({ok:0})
  }
})

app.listen(3001,()=>{
  console.log('listening on 3001')
})


var num = 0

//sock广播通信
//所用插件为socket.io
//基本的逻辑是，new message监听是否有新的聊天数据发过来，如果有，那么将消息转发给xxtoxx例：YoketoPeter
io.on('connection', function (socket) {//连接
  socket.on('new message',function(data){//监听new message，并对返回的data做解析
    console.log(data)//我这里的data就是一个json串
    console.log(`${data.from}to${data.to}`)//{比方我Yoke给Peter发送的就是YoketoPeter}
    io.sockets.emit(`${data.from}to${data.to}`,{//发送到YoketoPeter
      key:++num,//把key和data传给YoketoPeter的发送方（类似上面的new message就是发送方，data参数所接受的就是现在发送的key和data）
      ...data
    })
  })
})