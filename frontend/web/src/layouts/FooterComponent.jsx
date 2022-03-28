import React  from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    bottom:0,
  },
}));

export default function FooterComponent() {
  const classes = useStyles();
  return (
    <>
      {/* Footer */}
      <footer className={classes.footer} >
      <Typography>Privacy policy   &middot; Terms  &middot; Contact Us</Typography> 
      
        <Copyright />
     
      </footer>
      {/* End footer */}
    </>
  );
}
