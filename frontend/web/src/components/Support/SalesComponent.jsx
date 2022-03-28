import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect} from "react-router-dom";
//material ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Logo1 from "../../assets/img/OfficialLogo.svg";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
//local
import Copyright from "../../layouts/Copyright";
import { Sales } from "../../store/actions/support";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  name:null,
  email: null,
  description: null,
  phone_number: null,
};


function SalesComponent(props) {


  const classes = useStyles();

  const [crendentials, setCrendentials] = React.useState(initialCredentials);
  const { isAuthenticated, isUiLoading,  Sales } = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // submit the form
    const { name ,email, description, phone_number} = crendentials;
    if (name && email && description && phone_number) {
      Sales(crendentials);
    }
    setCrendentials('')
  };
  const handleInputChange = (e) => {
    // Set the values into current state
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  return (
    <>
    <Container component="main" maxWidth="xs" fixed
    style={{paddingTop:5,paddingLeft:5,paddingRight:5,border:"solid",borderWidth:0,borderRadius:5,backgroundColor:"inherit"}}>
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
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleInputChange}
            color="secondary"
          />
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
            name="phone_number"
            label="Mobile Number"
            type="text"
            id="phone_number"
            autoComplete="phone_number"
            onChange={handleInputChange}
          />
       
<TextField
           color="secondary"
            variant="filled"
            margin="normal"
            required
            focused
            fullWidth
            name="description"
            label="Give a few details"
            id="description"
            autoComplete="description"
            onChange={handleInputChange}
      
          />
            
     
          

                
          <Button
           type="submit"
fullWidth
variant="contained"
color="secondary"
disabled={isUiLoading}
className={classes.submit}
endIcon={isUiLoading && <CircularProgress size={20} />}
          >
            Submit
          </Button>
          
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}


SalesComponent.propTypes = {
  Sales: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, {Sales })(SalesComponent);