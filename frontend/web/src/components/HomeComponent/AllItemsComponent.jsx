import React from "react";
import { connect } from "react-redux";

//material Ui
import Button from "@material-ui/core/Button";
import { fade } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";


//local imports
import ProductDetailsComponent from "./ProductDetailsComponent";
import NoImage from "../../assets/img/oops-no-image.jpg";
import CommaFunct from "../../constant";
import { getItems } from "../../store/actions/items";
import { addItemToCart, removeItemFromCart } from "../../store/actions/cart";
import { createOrder } from "../../store/actions/orders";



const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out"
  },

  top:{
    marginTop:12,
    padding:6,
    fontWeight:600,
    lineHeight:1,

  },
  cardGrid: {
    top:2,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
  card: {
    // height: "100%",
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.1),
    },
    display: "flex",
    flexDirection: "column",
    marginBottom:0,
    position:"relative"
  },
  chip:{
    position: "absolute",
    top: "5%",
    backgroundColor: "none",
    fontFamily:"monospace",
    fontWeight:"bold", 
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  item: {
    marginBottom: theme.spacing(5),
  },
  pricetag:{
    color:theme.palette.grey[500]
  }
}));

function AllItemsComponent(props) {
  const classes = useStyles();

  const {
    items,
    cartItems,
    getItems,
    addItemToCart,
    removeItemFromCart,
    createOrder,
    isUiLoading,
  } = props;

  React.useEffect(() => {
    getItems();
  }, [getItems]);

  const handleAddItemToCart = (itemId,event) => {
    
    addItemToCart(itemId);
  };

  const handleRemoveItemFromCart = (itemId) => {
    removeItemFromCart(itemId);
  };
  
  const handleBuyNow = (itemId) => {
    createOrder([itemId]);
  };
  var cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height:"auto",
}
  return (
    <>
     
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={2}>
       
          <Grid item xs={12}>
            
            <Typography className={classes.top} color="textSecondary" variant="h3">Today's Menu</Typography>
          </Grid>

     
          {items.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              className={classes.item}
            >
                  {item.available  ? (
                    <>
              <Card  style={cardStyle} className={classes.card}>
           
                <CardMedia
                  className={classes.cardMedia}
                  image={item.image || NoImage}
                  title="Item Image"
                />

                  {cartItems.includes(item.id) && (
                      <Chip  label="Added" className={classes.chip}/>
                  )}
  
          
  
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.pricetag} gutterBottom variant="h5" component="h2">
                    Ksh. {CommaFunct(item.price)}
                  </Typography>
                  <Divider/>
                  <Typography style={{fontWeight:600,fontSize:16,marginTop:5,}}>{item.name}</Typography>
         
              
              
                </CardContent>
               
              </Card>
              <CardActions>
                  {cartItems.includes(item.id) ? (
                    <>
                   
                    <Button
                    style={{color:"#FD5D5D",fontWeight:"bold"}}
                    variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => handleRemoveItemFromCart(item.id)}
                      disabled={isUiLoading}
                    >
                    Remove 
                    </Button>
                    </>
                  ) : (<>
                    <Button
                    
                      size="small"
                      color="secondary"
                      variant="contained"
                      fullWidth
                      onClick={() => handleAddItemToCart(item.id)}
                      disabled={isUiLoading}
                      style={{fontSize:12,fontWeight:"bold"}}
                    >
                      Add to Menu
                    </Button>
                      
                     </>
                  )}
                      
              <ProductDetailsComponent
                item={item}
                buyNow={() => handleBuyNow(item.id)}
                isUiLoading={isUiLoading}
              />
                </CardActions>
          
          </>
           
              ) : (
                <>
                  
              <Card  style={cardStyle} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.image || NoImage}
                title="Image title"
                style={{filter:"blur(5px)",}}
              />
              <Chip  label="Currently Unavailable" className={classes.chip}/>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.pricetag} gutterBottom variant="h5" component="h2">
                  Ksh. {item.price.toLocaleString()}
                </Typography>
                <Divider/>
                <Typography style={{fontWeight:600,fontSize:16,marginTop:5,}}>{item.name}</Typography>
               
            
              </CardContent>
            
            </Card>
            
              </>
              
    )}
            </Grid>
          ))}
        </Grid>
      </Container>
   
   
    </>
  );
}

AllItemsComponent.propTypes = {
  items: PropTypes.array.isRequired,
  cartItems: PropTypes.array.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  cartItems: state.cart.cart.items,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(mapStateToProps, {
  getItems,
  addItemToCart,
  removeItemFromCart,
  createOrder,
})(AllItemsComponent);
