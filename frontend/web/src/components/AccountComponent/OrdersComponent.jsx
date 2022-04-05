import React from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//material ui
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CommaFunct from "../../constant";
import NoImage from "../../assets/img/oops-no-image.jpg";
import { getOrders, cancelOrder } from "../../store/actions/orders";

const useStyles = makeStyles((theme) => ({
  chip: {
 
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding:5,
    margin:7,
   
  },
  subtitle:{
    color:theme.palette.grey[100]
  }
}))

function OrdersComponent(props) {
  const classestwo = useStyles();
  const [DialogOpen, setDialogOpen] = React.useState(false);
  const { classes, orders, getOrders, cancelOrder, isUiLoading } = props;
  dayjs.extend(relativeTime);
  React.useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId);
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const renderSingleOrder = (items) => {
    return items
      .map((item, index) => {
        return (
          <div key={index}>
            <div className={classes.cardRow}>
              <img
                className={classes.cardImage}
                src={item.image || NoImage}
                alt="Not available"
              />
              <div className={classes.itemDetail}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="h5">Ksh {CommaFunct(item.price)}</Typography>
              </div>
            </div>
            <Divider />
          </div>
        );
      })
      .reverse();
  };

  const renderOrders = () => {
    return orders
      .map((order, index) => {
        return (
          <div key={index}>
            <Accordion
              defaultExpanded={false}
              className={classes.orderAccordian}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div>
               
                  <Typography variant="body2" color="textPrimary">
                    Order ID &middot; {order.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Table &middot; {order.table_id}
                  </Typography>
             
                  {order.status === 0 &&   order.is_active === false
                  ?(
                  
                    <Chip  label="Requested Cancellation" className={classestwo.chip}   style={{backgroundColor:'#5EE6EB'}} />
                  ):(
                    <Chip  label="Pending" className={classestwo.chip}   style={{backgroundColor:'#C1F8CF'}} />
                  )
                  }
                 {order.status === 1
                  && (
                  
                    <Chip  label="Accepted" className={classestwo.chip} style={{color:'black',backgroundColor:'yellow'}} />
                  )
                  }
                    {order.status === 2
                  && (
                  
                    <Chip label="Cancelled" className={classestwo.chip} style={{backgroundColor:'#F68989'}}/>
                  )
                  }
                  <Typography variant="h4">Ksh.{CommaFunct(order.total_ammount)}</Typography>
                  
                  <Typography variant="subtitle1" color="textSecondary">
                  Ordered {dayjs(order.added_on).fromNow()}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.cardContent}>
                {renderSingleOrder(order.all_items)}
              </AccordionDetails>
              
              {order.is_active && (
                <AccordionActions>
                
                  {order.status === 0
                  && (
                  
                   
                           <Button
                           size="small"
                           color="secondary"
                           variant="contained"
                          
                           disabled={isUiLoading}
                           onClick={handleOpenDialog}
                         >
                           Request Cancellation
                         </Button>
                  )
                  }

                  <Dialog
          open={DialogOpen}
          onClose={handleCloseDialog }
        
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle >
            {"Are you sure to want to cancel your order?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If the order has not been picked this will automatically cancel your order however if picked and status is accepted or cancelled you can no longer request to cancel your order.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              No
            </Button>
            <Button
              onClick={() => handleCancelOrder(order.id)}
              color="secondary"
              disabled={isUiLoading}
              autoFocus
              variant="contained"
            >
              Yes cancel my order
            </Button>
          </DialogActions>
        </Dialog>
                </AccordionActions>
              )}
            </Accordion>
            <Divider />
          </div>
        );
      })
      .reverse();
  };

  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" style ={{fontWeight:800}}align="center">
            
              Orders
            </Typography>
          </Grid>
     
          <Grid item xs={12}>
         
            {orders.length ? (
              <>

      
                <CardContent
                  className={clsx(
                    classes.cardContent,
                    classes.cardContentOrders
                  )}
                >
                  <Divider />
                  {renderOrders()}
                </CardContent>
              </>
            ) : (
              <Typography variant="subtitle1"color="textSecondary" className={classes.subtitle} align="center">
                No orders yet,When you order it will show up here
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

OrdersComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive.
  orders: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, { getOrders, cancelOrder })(
  OrdersComponent
);
