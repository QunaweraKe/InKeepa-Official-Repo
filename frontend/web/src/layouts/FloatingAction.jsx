import React from "react";
import Fab from '@material-ui/core/Fab';
import Badge from "@material-ui/core/Badge";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { makeStyles } from "@material-ui/core/styles"; 
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { routes } from "../Routes";

const useStyles = makeStyles((theme) => ({
  fab:{
    
    padding:theme.spacing(3),
    marginBottom:theme.spacing(10)

  },
}));




function FloatingAction(props) {

  const {isUiLoading,  itemsCountInCart } = props;
  const history = useHistory();
  const handleRouteClick = (route) => {
    history.push(route);
  };
  const classes = useStyles();


  return (
    <Fab className={classes.fab}
    onClick={() => handleRouteClick(routes.cart)}
    disabled={(itemsCountInCart? false : true)|| isUiLoading }
    size="small"
    variant="extended"
    color="primary" aria-label="edit"
    sx={{ mr: 2 }}
    style={{ textDcoration: "underline", margin: 10, bottom: 10, right: 30, left: "auto", position: "fixed" }}>
       Place order 
    <Badge 
                 anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={itemsCountInCart}
                 color="secondary">
                  <RestaurantMenuIcon  />
                </Badge>

  </Fab>
  );
}
FloatingAction.propTypes = {
  itemsCountInCart: PropTypes.number.isRequired,
  isUiLoading: PropTypes.bool.isRequired,

};

const matpStateToProps = (state) => ({
  itemsCountInCart: state.cart.cart.items.length,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(matpStateToProps, { })(
  FloatingAction
);
