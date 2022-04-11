import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
//material ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
import { signUp } from "../store/actions/auth";
import { routes } from "../Routes";
import  TermsOfService  from "./TermsAndPrivacyComponent/TermsOfService";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
   
  visibility:{

    marginTop: theme.spacing(-1),
    right:3


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
    margin: theme.spacing(1, 0,1),
  },
}));

const initialCredentials = {
  is_nursery: false,
  email: null,
  password1: null,
  password2: null,
};


function SignUpComponent(props) {
  const [showPassword, setShowPassword] = React.useState(true);

  const classes = useStyles();
  const history = useHistory();

  const [crendentials, setCrendentials] = React.useState(initialCredentials);
  const { isAuthenticated, isUiLoading, signUp } = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // submit the form
    const { email, password1, password2 } = crendentials;
    if (email && password1 && password1 === password2) {
      signUp(crendentials);
    }
  };
  const handleInputChange = (e) => {
    // Set the values into current state
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
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
            name="password1"
            label="Password"
            type={showPassword ? 'password' : 'text'}
            id="password1"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
       
<TextField
           color="secondary"
            variant="filled"
            margin="normal"
            required
            focused
            fullWidth
            name="password2"
            label="Confirm Password"
            id="password2"
            autoComplete="current-password"
            onChange={handleInputChange}
            type={showPassword ? 'password' : 'text'}
      
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
                {showPassword ? "Show Passwords": "Hide Passwords"}
              </Button>
    
</Grid>
          
<Grid item xs={6}>
                  <FormControlLabel
                    labelPlacement="end"
                  
                    control={
                      <Checkbox
                        color="secondary"
                        name="is_nursery"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<span style={{ fontSize: "10px", fontWeight: "bold", color: "grey" }}>Receive updates</span>}
                  
                  />
                </Grid>
                
          <Button
           type="submit"
fullWidth
variant="contained"
color="secondary"
disabled={isUiLoading}
className={classes.submit}
endIcon={isUiLoading && <CircularProgress size={20} />}
          >
            Get Started
          </Button>
          <Typography  variant="body" align ="center" color="secondary">By Signing In you agree to our and Privacy Policy</Typography>
          
          <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => handleRouteClick(routes.signin)}
                    variant="body2"
                    component="button"
                    color="secondary"
                    style={{textDecoration:"underline",fontWeight:800,fontSize:".8em"}}
                  >
                    Already a User? Sign In
                  </Link>
                </Grid>
              </Grid>
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}


SignUpComponent.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, { signUp })(SignUpComponent);