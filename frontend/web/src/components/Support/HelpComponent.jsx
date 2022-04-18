import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
//material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//local
import Copyright from "../../layouts/Copyright";
import { Help } from "../../store/actions/support";
import { Typography } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  paper: {
  
    alignItems: 'center',
    position:"absolute",
    left:0,
    bottom:0,
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
  subject: null,
  description: null,
  orderId:null,

};


function HelpComponent(props) {
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
     const { orderId,subject,description} = credentials;
    if (orderId &&  subject &&  description) {
      Help(credentials);
      
    }
    setCrendentials('');
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
     <Button  size= "small"  color="secondary" onClick={handleClickOpen}>
        Need Help?
      </Button>
      <Dialog fullWidth maxWidth="xs" classes={{paper:classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <Typography color="textSecondary" style={{fontWeight:"bold"}} variant ="subtitle1">Help Center</Typography>
        <DialogContent>


      
      <form
className={classes.form}
noValidate
onSubmit={handleFormSubmit}
>  
<Typography variant="subtitle2">
Fill in all the fields below.

  </Typography>       
  <i>You will be contacted using email address associated to this account.</i>
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
            focused
            helperText="Incase of an order  add the ID for easier reference else leave blank."
            fullWidth
            name="orderId"
            label="Order ID"
            type="text"
            id="orderId"
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
            

            <DialogActions>
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
          </DialogActions>
        </form>
    
      <Box mt={4}>
        <Copyright />
      </Box>
    </DialogContent>
    </Dialog>
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