import React from "react";
import { useHistory } from 'react-router-dom';

// Material UI

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from "@material-ui/icons/Delete";
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Empty from "../../assets/img/empty.svg";
import NoImage from "../../assets/img/oops-no-image.jpg";
import { emptyCart, removeItemFromCart } from "../../store/actions/cart";
import { createOrder } from "../../store/actions/orders";
import CommaFunct from "../../constant";
const initialCredentials = {

  table_id: null,

};

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  cardImage: {
    height: 100,
    width:100,
    marginLeft: "0",
    borderRadius:10,
  },
  cardRow: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetail: {
    textAlign: "end",
  },
  cardActions: {
    display: "flex",
    alignSelf: "flex-end",
    marginRight: "10px",
  },
  removeItemButton: {
    marginTop: theme.spacing(1),
  },
}));

function CartComponent(props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [credentials, setCrendentials] = React.useState(initialCredentials);
  const { isUiLoading, createOrder, emptyCart, removeItemFromCart, cart } =
    props;
  const { all_items: items, total_ammount: totalPrice } = cart;
  const handleEmptyCart = () => {
    emptyCart();
  };

  const handleDeleteItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    await createOrder(cart.items,credentials.table_id);
    handleClose();
    await emptyCart();
  };
  const handleInputChange = (e) => {
    // Set the values into current state
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const renderItems = () => {
    return items
      .map((item, index) => {
        return (
          <div key={index}>
            <div className={classes.cardRow}>
              <img
                className={classes.cardImage}
                src={item.image || NoImage}
                alt="not available"
              />
              <div className={classes.itemDetail}>
                <Typography  color="textSecondary" variant="h4"> {item.name}</Typography>
                <Typography color="textSecondary" variant="subtitle1"><i>Price</i> &#x3A; Ksh {CommaFunct(item.price)}</Typography>
                <Button
                    style={{fontSize:12,fontWeight:"bold",backgroundColor:"#FF1818",}}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteItem(item.id)}
                  startIcon={<DeleteIcon />}
                  className={classes.removeItemButton}
                  disabled={isUiLoading}
                >
                  Remove  
                </Button>
              </div>
            </div>
            <Divider />
          </div>
        );
      })
      .reverse();
  };

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Button
          style={{marginBottom:5,}}
      variant="contained"
      color="secondary"
      onClick={() => history.goBack()}
    >
      < KeyboardBackspaceIcon />Back
    </Button>
            <Typography style={{fontWeight:"bold"}}variant="h4" align="center">
              Menu Check
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card className={classes.card}
              style={{
              
                padding:10,
                
                }}>
                {items.length ? (
                  <>
                    <CardContent className={classes.cardContent}>
                      {renderItems()}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                    {items.length > 1 ? (
                      <Button
                        size="small"
                        color="secondary"
                        onClick={handleEmptyCart}
                        variant="contained"
                        disabled={isUiLoading}
                        style={{fontSize:12,fontWeight:"bold",backgroundColor:"#FF1818",}}
                      >
                        Clear All
                      </Button>
                    ):(
                      <></>
                    )}
                    </CardActions>
                  </>
                ) : (
                  <>
                  <img
                className={classes.cardImage}
                src={Empty}
                alt="Not available"
              />
                  <Typography variant="body" style={{fontWeight:"bold",fontSize:20,}} color="textSecondary" align="center">
                    No Items in your menu
                  </Typography>

                  </>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card className={classes.card}
               style={{
                
                padding:10,
                
                }} >
                <CardContent className={classes.cardContent}>
                <Divider />
                <Typography style={{fontSize:25}}>Total Amount Payable</Typography>
                <Typography style={{fontSize:15}}>
                  
                  {items.length} Item(s)</Typography>
                  <Typography variant="h3">Ksh {CommaFunct(totalPrice)}</Typography>
                  <Divider />
                </CardContent>
                <CardActions>
                <Button       disabled={(items.length ? false : true) || isUiLoading}
                variant="contained" color="secondary" onClick={handleClickOpen}>
        Submit Order
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form
className={classes.form}
noValidate
onSubmit={handleCheckout}
>
        <DialogContent>
          <DialogContentText>
            Add your table ID <i>i.e can be number or letter that uniquely identifies your table</i>
          </DialogContentText>


          <TextField
            autoFocus
            margin="dense"
            id="table_id"
            label="Table ID"
            type="text"
            fullWidth
            name="table_id"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
                    size="large"
                    color="secondary"
                    type="submit"
                    variant="contained"
                  
                  >
                    Ok
                  </Button>
        </DialogActions>
        </form>
      </Dialog>
                 
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CartComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive.
  cart: PropTypes.object.isRequired,
  emptyCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, {
  emptyCart,
  removeItemFromCart,
  createOrder,
})(CartComponent);
