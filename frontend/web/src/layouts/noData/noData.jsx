import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

// Local

const NoData = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
       
    </div>
  );
};

NoData.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoData;