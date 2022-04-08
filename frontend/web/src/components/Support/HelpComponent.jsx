import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
//material ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Logo1 from "../../assets/img/OfficialLogo.svg";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//local
import Copyright from "../../layouts/Copyright";
import { Help } from "../../store/actions/support";
import BackButton from "../../layouts/BackButton";
import { Typography } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
  subject: null,
  description: null,

};


function HelpComponent(props) {
 

  const classes = useStyles();

  const [credentials, setCrendentials] = React.useState(initialCredentials);
  const {  isUiLoading,  Help } = props;

  const handleFormSubmit = () => {
  
    try
    {   
     const { name ,email, subject,description} = credentials;
    if (name && email  && subject && description) {
      Help(credentials);
      setCrendentials('');
    }
  
    return console.log("success")
  }
  catch (err) {
    return console.log("error")
  }

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
  

    <Container component="main" maxWidth="sm" fixed>
      <Box mt={2}>
      <BackButton/>
      </Box>
 
      <CssBaseline />
      <div className={classes.paper}>
   
  
        <img
className={classes.LogoImage}
src={Logo1}
alt="null"
/>
     <Typography variant="subtitle1" color="textSecondary">Hi,Let us know what your is issue here.</Typography>
      
      <form
className={classes.form}
noValidate
onSubmit={handleFormSubmit}
>  
<Typography variant="subtitle2">
Fill in all the fields below.
  </Typography>       
 
  
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
            name="subject"
            label="Subject"
            type="text"
            id="subject"
            autoComplete="subject"
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
            label="Description"
            id="description"
            autoComplete="description"
            onChange={handleInputChange}
            multiline
            rows={5}
      
          />
            

          <Button
           type="submit"
fullWidth
variant="contained"
color="secondary"
disabled={isUiLoading}
className={classes.submit}
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


HelpComponent.propTypes = {
  Help: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, {Help })(HelpComponent);