import React,{Component} from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Slider from './Components/Sider'
import io from 'socket.io-client'
var socket = io("http://localhost:3002")

const styles = theme =>({
  head:{
    position:'absolute',
    top:'0.2rem'
  },
  send:{
    display:'flex',
    justifyContent:'center',
    position:'static',
    bottom:'0',
    backgroundColor:'white',
  },
  chatContain:{
    margin:0,
    padding: '1rem',
    paddingTop:'3rem',
    listStyle: 'none',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&:scrollbar':{
      display: 'none'
    },
    '& li':{
      position: 'relative',
      clear: 'both',
      display: 'inline-block',
      margin: '0 0 1rem 0',
      font:"16px/20px 'Noto Sans', sans-serif",
      borderRadius: '10px',
      backgroundColor: 'rgba(25, 147, 147, 0.2)',
      maxWidth:'35vw',
      wordWrap:'break-word',
      textAlign:'justify',
    },
    '& li:before':{
      position: 'absolute',
      top: 0,
      width: '50px',
      height: '50px',
      borderRadius: '50px',
      content: '',
    },
    '& li:after': {
      position: 'absolute',
      top: '15px',
      content: '',
      width: 0,
      height: 0,
      borderTop: '15px solid rgba(25, 147, 147, 0.2)',
    }
  },
  me: {
    animation: 'show-chat-odd 0.15s 1 ease-in',
    padding:'0.6rem 0.5rem 0.6rem 0.8rem',
    float: 'right',
    marginRight: '1rem',
    color: '#0AD5C1',
    '& :after': {
      borderRight: '15px solid transparent',
      right: '-15px',
    },
  },
  user: {
    animation: 'show-chat-even 0.15s 1 ease-in',
    padding:'0.6rem 0.8rem 0.6rem 0.5rem',
    float: 'left',
    marginLeft: '1rem',
    color: '#0EC879',
    '& :after': {
      borderLeft: '15px solid transparent',
      left: '-15px',
    },
  }
})
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendHeight:72,
      chatText:[],
      userList:['Yoke','Peter','Anna'],
      user:'',
      head:''
    }
  }
  componentWillMount = () =>{
    {/*
      这段代码就是等页面加载完成所要添加的一些功能，react前端个框架的知识点，可以不用太纠结
      首先我在userList里定义了我的用户列表
      因为我前端每次切换路由，数据还是没变，所以我需要用chatText数组来存储不同的用户之间的对话
    */}
    var chatText = this.state.chatText;
    chatText[this.state.head] = new Array()
    for(let head of this.state.userList){
      chatText[head] = new Array()
    }
    this.setState({chatText})    
    this.getCookie('name')
    this.state.userList.map((i) => {
      this.state.userList.map((j) => {
        socket.on(`${i}to${j}`,(res)=>{
          for(let head of this.state.userList){
            {/*遍历检测只有当所监听的目标里含有比如YoketoPeter含有Yoke和Peter时，将对话添加到相应的用户数组chatText中，更新页面（setState）*/}
            if(`${i}to${j}`.includes(head)&&`${i}to${j}`.includes(this.state.user)){
              chatText[head].push({sign:res.from === this.state.user?'me':'user',msg:res.msg,key:res.key})
              this.setState({chatText})
            }
          }
        })
      })
    })
  }
  getCookie = (c_name) =>{
  if (document.cookie.length>0){
    var c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1){
      var c_start=c_start + c_name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
        this.setState({user:unescape(document.cookie.substring(c_start,c_end))})
      }
    }
  }
  Postmessage = () =>{
    var sendData = this.sendData.value
    var user = this.state.user
    var head = this.state.head
    if(sendData.length && head.length){
      {/*发送{from:user,to:head,msg:sendData}json数据到new message，后端通过on监听到*/}
      socket.emit('new message',{from:user,to:head,msg:sendData})
      {/*输入框清0*/}
      this.sendData.value = ''
    }else{
      alert('error')
    }
  }
  SwitchPerson = (val) =>{
    this.setState({head:val})
    var chatText = this.state.chatText;
    if(chatText[val] == undefined){
      chatText[val] = new Array();
      this.setState({chatText})
    }
  }
  render(){
    const {classes} = this.props
    console.log(this.state.chatText)
    return(
      <div className = {classes.outer}>
        <Slider SwitchPerson = {this.SwitchPerson.bind(this)}>
          <div style = {{backgroundColor:'#EEEEEE'}}>
            <span className = {classes.head}>{this.state.head}</span>
            <ul className = {classes.chatContain} style = {{height:`calc(100vh - 5rem - ${this.state.sendHeight}px)`}}>
              {this.state.chatText[this.state.head].map((item) => {
                return <li key = {item.key} className = {classes[item.sign]}>{item.msg}</li>
              })}
            </ul>
            <div className = {classes.send} ref = {ref => this.send = ref}>
              <TextField
                label = "Typing"
                rowsMax="4"
                multiline = {true}
                fullWidth
                style = {{marginLeft:'2rem'}}
                placeholder = "Type here"
                margin="normal"
                inputRef = {ref => this.sendData = ref}
                />
              <Button style = {{paddingBottom:0}} onClick = {this.Postmessage}>发送</Button>
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}
export default withStyles(styles)(Chat)
