import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
//material ui

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Logo1 from "../assets/img/OfficialLogo.svg";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from '@material-ui/core/Checkbox';
//local
import Copyright from "../layouts/Copyright";
import { signIn } from "../store/actions/auth";
import { routes } from "../Routes";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
   
  visibility:{

    marginTop: theme.spacing(-10),
    right:5


 },
  LogoImage: {
    top:0,
    height: 150,
    width:150,
    marginLeft: "0",
    backgroundColor:"none"
    },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialCredentials = {
  email: null,
  password: null,
  remember_me: false,


  };
  
function SignInComponent(props)  {
  const [showPassword, setShowPassword] = React.useState(true);

  const classes = useStyles();
  const history = useHistory();
  const[disabled,setDisabled]=React.useState(true);
  const [credentials, setCredentials] = React.useState(initialCredentials);
  const { isAuthenticated, isUiLoading, signIn } = props;

  const handleFormSubmit = (e) => {
        e.preventDefault();

// submit the form
const { email, password } = credentials;
if (email && password) {
signIn(email, password);
}
};




const handleInputChange = (event) => {
  const value = event.target.type !== 'checkbox'
    ? event.target.value
    : event.target.checked;
    
    setCredentials((prevState)=>({
    ...prevState,
    [event.target.name]: value,
  }));
  setDisabled(false);
};


const handleRouteClick = (route) => {
history.push(route);
};


  return (
    <>

    <Container component="main" maxWidth="xs" fixed>
    {isAuthenticated && <Redirect to="/" />}
      <CssBaseline />
      <div className={classes.paper}>
   
 
        <img
className={classes.LogoImage}
src={Logo1}
alt="null"
/>

    
      <form
className={classes.form}
noValidate
autoComplete="off"
onSubmit={handleFormSubmit}
>
          <TextField
          focused
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            color="secondary"
          />
          <TextField
           color="secondary"
            variant="filled"
            margin="normal"
            required
            focused
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'password' : 'text'}
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
           <Grid item >
        <Button
               style={{fontSize:10,padding:5,marginTop:4,background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}
                aria-label="toggle password visibility"
                onClick={(e) => { setShowPassword(!showPassword) }}
                className={classes.visibility}
                variant="contained"
                endIcon
                color="secondary"
                size="small"
                
              >
                {showPassword ? "Show Password": "Hide Password"}
              </Button>
    
    
          
</Grid>
          
          <Grid item xs={6}>
          <FormControlLabel   
                control={(
                  <Checkbox
                  color="secondary"
                  name="is_nursery"
                  onChange={handleInputChange}
                />
                )}
                label={<span style={{ fontSize: "10px", fontWeight: "bold", color: "grey" }}>Keep me logged in</span>}
              />
              </Grid>
          <Button
           type="submit"
fullWidth
variant="contained"
color="secondary"
//disabled={isUiLoading}
className={classes.submit}
endIcon={isUiLoading && <CircularProgress size={20} />}
//disabled={disabled|| isUiLoading}
disabled={disabled }

          >
            Sign In
          </Button>
         
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"
              color="secondary"
              style={{textDecoration:"underline",fontWeight:800,fontSize:".8em"}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <Link
onClick={() => handleRouteClick(routes.signup)}
variant="body2"
component="button"
color="secondary"
style={{textDecoration:"underline",fontWeight:800,fontSize:".8em"}}
>
{"Don't have an account? Sign Up"}
</Link>
            </Grid>

         
          </Grid>
        </form>
      </div>
      <Box mt={2}>
      <Link
onClick={() => handleRouteClick(routes.help)}
variant="body2"
component="button"
color="secondary"
style={{fontWeight:800,fontSize:".8em"}}
>
{"Need Help?"}
</Link>
        <Copyright />
      </Box>
     
    </Container>
  
    </>
  );
}

SignInComponent.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
  };
  
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isUiLoading: state.ui.isUiLoading,
  });
export default connect(mapStateToProps, { signIn })(SignInComponent);