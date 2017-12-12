import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Nofig from './Components/Nofig'
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: "center",
    flexDirection:'column',
    width:'60vw',
    margin:'0 auto',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  buttons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  button:{
    margin:'1rem'
  },
  back:{
    height:'30vh',
    width:'30vh',
    backgroundImage:'url(./logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    margin:'0 auto'
  }
});

class Login extends React.Component {
  state = {
    password: '',
    showPassword: false,
    SnackbarOpen: false,
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }
  setCookie = (c_name,value,expiredays) => {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  }
  onLogin = () =>{
    var name = this.name.value
    var psd = this.psd.value
    fetch('/login',{
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:name,psd:psd})
    }).then((res) => {
      res.json().then((data) => {
        console.log(data.ok)
        if(data.ok){
          this.setCookie('name',name,1)
          window.location = "/Chat"
        }else{
          this.handleSnackClick()
        }
      })
    })
  }
  onRegister = () =>{
    window.location = "/Chat"
  }
  handleSnackClick = () => {
    this.setState({ SnackbarOpen: true });
  };

  handleSnackClose = () => {
    this.setState({ SnackbarOpen: false });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Nofig
          handleRequestClose = {this.handleSnackClose}
          open = {this.state.SnackbarOpen}
          msg = "password error"
        />
        <FormControl className={classes.formControl}>
          <div className = {classes.back}></div>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Name</InputLabel>
          <Input inputRef = {ref => this.name = ref} id="name-simple" onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            inputRef = {ref => this.psd = ref}
            type={this.state.showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className = {classes.buttons}>
          <Button onClick = {this.onLogin} raised color="primary" className={classes.button}>
            Login
          </Button>
          <Button raised color="accent" className={classes.button} onClick = {this.onRegister}>
            Register
          </Button>
        </FormControl>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
