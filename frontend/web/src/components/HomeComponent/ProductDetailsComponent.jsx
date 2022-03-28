import React from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


//material ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
//local
import NoImage from "../../assets/img/oops-no-image.jpg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  item: {
    textAlign: "center",
  },
  itemDetail: {
    marginTop: theme.spacing(3),
  },
  itemImage: {
    maxWidth: "100%",
    maxHeight:"80%"
  },
  buyNowButton: {
    maxWidth: "15rem",
    margin: "1em auto",
  },
}));

export default function ProductDetailsComponent(props) {
 
  const { item, buyNow,isUiLoading } = props;
  const classes = useStyles();
  dayjs.extend(relativeTime);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
       style={{fontSize:12,fontWeight:"bold"}}
        size="small"
        color="primary"
        fullWidth
           variant="contained"
        onClick={handleClickOpen}
        disabled={isUiLoading}
      >
      View
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      
      >
        <DialogTitle>
        <Grid container>
           <Grid item xs style={{marginTop:8}}>
          <Button
            color="secondary"
            onClick={handleClose}
            aria-label="close"
            variant="outlined"
          >
            <ArrowBackIcon /><Typography>Back</Typography>
          </Button>
          </Grid>
          <Grid item style={{marginTop:8}}>
          <Typography style={{fontSize:12,marginTop:5,}}> Added {dayjs(item.added_on).fromNow()}
              </Typography>
          </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} className={classes.item}>
              <img
                className={classes.itemImage}
                src={item.image || NoImage}
                alt="not available"
              />
            </Grid>
            <Divider orientation="vertical" flexItem  style={{width:4,}} />
            <Grid item xs={12} md={5} className={classes.item}>
              <div className={classes.itemDetail}>
                <Typography style={{fontWeight:800,fontSize:16,marginTop:5,}}>{item.name}</Typography>
              
                <Typography variant="body">{item.description}</Typography>
             
              </div>

              
             
              
            </Grid>
          </Grid>
        </DialogContent>
        <Typography color="textSecondary"  align="center" style={{fontWeight:"bolder",fontSize:28,marginTop:5,}}variant="h3">Ksh {item.price}</Typography>
        <DialogActions className={classes.buyNowButton}>
             
             <Button
               size="small"
               color="secondary"
               fullWidth
               variant="contained"
               onClick={buyNow}
               disabled={isUiLoading}
             >
               Order Now
             </Button>
           
           </DialogActions>
   
      </Dialog>
    </>
  );
}

ProductDetailsComponent.propType = {
  item: PropTypes.object.isRequired,
  buyNow: PropTypes.func.isRequired,
};
