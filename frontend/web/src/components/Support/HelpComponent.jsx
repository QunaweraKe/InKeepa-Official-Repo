import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
//material ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Logo1 from "../../assets/img/OfficialLogo.svg";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//local
import Copyright from "../../layouts/Copyright";
import { Help } from "../../store/actions/support";




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
  subject: null,
  description: null,

};


function HelpComponent(props) {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [credentials, setCrendentials] = React.useState(initialCredentials);
  const {  isUiLoading,  Help } = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try
    {   
     const { name ,email, subject,description} = credentials;
    if (name && email  && subject && description) {
      Help(credentials);
    }
    setCrendentials('');
    handleClose();
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
    <Container component="main" maxWidth="xs" fixed
    style={{paddingTop:5,paddingLeft:5,paddingRight:5,border:"solid",borderWidth:0,borderRadius:5,backgroundColor:"inherit"}}>
      <CssBaseline />
      <div className={classes.paper}>
   
  
        <img
className={classes.LogoImage}
src={Logo1}
alt="null"
/>

<Typography>Need Further Assistance from our Team?</Typography>
<Button  color="primary" onClick={handleClickOpen}>
        Click Here
      </Button>
      <Button
      variant="contained"
      color="primary"
      onClick={() => history.goBack()}
    >
      < ArrowBackIcon />Go Back
    </Button>
      <Dialog open={open} onClose={handleClose} sm aria-labelledby="form-dialog-title">
      <form
className={classes.form}
noValidate
onSubmit={handleFormSubmit}
>         
<DialogTitle>
  Fill in all the fields below.
  </DialogTitle>  
<DialogContent>
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
            maxRows={5}
      
          />
            
            </DialogContent>
          

               <DialogActions>
               <Button
           type="submit"
           onClick={handleClose}
fullWidth
variant="outlined"
color="secondary"
className={classes.submit}
endIcon={isUiLoading && <CircularProgress size={20} />}
          >
            Cancel
          </Button>
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
          </DialogActions> 
          
        </form>
        </Dialog>
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