import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List,{ListItem, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import SearchIcon from 'material-ui-icons/Search';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  menuButton: {
    position:'absolute',
    top:'0.5rem',
    left:'1.5rem',
    fontSize:'2rem',
    zIndex:'1000',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    position:'relative',
    top:'55vh',
    ...theme.mixins.toolbar,
  },
  content: {
    margin:'0',
    height:'calc(100vh - 1rem)',
    flexGrow: 1,
    marginLeft: -drawerWidth,
    position:'absolute',
    top:'0',
    right:'0',
    paddingTop:'1rem',
    backgroundColor: '#EEEEEE',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  list:{
    textAlign:'justify',
    paddingLeft:'1rem',
    paddingRight:'0.5rem'
  },
  divider:{
    marginLeft:'1rem',
    marginRight:'0.5rem',
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class Slider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: true,
      mainwidth:`calc(100% - ${drawerWidth}px)`,
      userList:[
        {name:'Yoke',psd:'123'},
        {name:'Peter',psd:'1234'},
        {name:'Anna',psd:'12345'}
      ],
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true, mainwidth:`calc(100% - ${drawerWidth}px)`});
  }

  handleDrawerClose = () => {
    this.setState({ open: false, mainwidth:'100%'});
  }
  getCookie = (c_name) =>{
  if (document.cookie.length>0){
    var c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1){
      var c_start=c_start + c_name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
  }
  getName = (name) =>{
    this.props.SwitchPerson(name)
  }
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <List className={classes.list}>
                <Input
                  id="search"
                  placeholder = "search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </List>
              {this.state.userList.filter((i)=>{return i.name !== this.getCookie('name')}).map((item) => {
                return (
                  <div key = {item.psd}>
                    <List className={classes.list}>
                      <ListItem button onClick = {this.getName.bind(null,item.name)}>
                        <ListItemText primary={item.name} secondary="Hello" />
                      </ListItem>
                    </List>
                    <Divider className = {classes.divider} />
                  </div>
                )
              })}
              <div className={classes.drawerFooter}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
            </div>
          </Drawer>
          <main style = {{width:this.state.mainwidth}} className={classNames(classes.content, this.state.open && classes.contentShift)}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Slider);
