import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Menu from "@material-ui/core/Menu";
import Slide from '@material-ui/core/Slide';
import AccountCircle from "@material-ui/icons/AccountCircle";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness2';
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import Logo1 from "../assets/img/OfficialLogo.svg";
import { routes } from "../Routes";
import { signOut } from "../store/actions/auth";
import { toggleTheme } from "../store/actions/ui";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  
   
  },
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor:"inherit" },
    filter:"blur(.5px)",
    
  },
 
  toolbar: {
    maxHeight: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  LogoImage: {
    top:0,
    height: 120,
    width:120,
    marginLeft: "0",
  },
  title: {
    flexGrow: 1,
  },
  navLogo: {
    fontSize: theme.typography.h5.fontSize,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  navLogoImage: {
    flexGrow: 1,
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  themeSwitchButton: {
    marginRight: theme.spacing(0.5),
  },
}));

function HeaderComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const { signOut, defaultTheme, toggleTheme } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRouteClick = (route) => {
    history.push(route);
  };

  const handleLogout = () => {
    signOut();
  };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar variant="dense"  className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link
              underline="none"
              component="button"
              className={classes.navLogo}
              onClick={() => handleRouteClick(routes.root)}
              color="inherit"
            >
              <img
                className={classes.LogoImage}
                src={Logo1}
                alt="null"
              />
            </Link>
            <IconButton
              edge="end"
              aria-label="home"
              aria-haspopup="true"
              className={classes.navLogoImage}
              onClick={() => handleRouteClick(routes.root)}
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
          </Typography>
          <div className={classes.root} />
          <div>
           
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleAccountMenuOpen}
              color="inherit"
              
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="theme switch"
              className={classes.themeSwitchButton}
              onClick={() =>
                toggleTheme(defaultTheme === "dark" ? "light" : "dark")
              }
              color="inherit"
            >
              {defaultTheme === "dark" ? (
                <IconButton className={classes.customHoverFocus}>
                <Brightness3Icon />
                </IconButton>
              ) : (
                <IconButton  className={classes.customHoverFocus}>
                <WbSunnyIcon/>
                </IconButton>
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleRouteClick(routes.account)}
        style={{fontSize:15,fontWeight:"bolder"}}>
           Account
        </MenuItem>
        <MenuItem   style={{fontSize:15,fontWeight:"bolder"}} onClick={handleClickOpen}>Log Out</MenuItem
        >
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
    
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your session will end?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary" variant="contained">
           Yes,Log Out
          </Button>
        </DialogActions>
      </Dialog>

      </Menu>
     
    </div>
  );
}

HeaderComponent.propTypes = {
  signOut: PropTypes.func.isRequired,
  defaultTheme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const matpStateToProps = (state) => ({
  defaultTheme: state.ui.defaultTheme,
});

export default connect(matpStateToProps, { signOut, toggleTheme })(
  HeaderComponent
);
