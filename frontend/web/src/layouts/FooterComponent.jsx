import React  from 'react';
import { makeStyles } from "@material-ui/core/styles";

//material

//local

import Copyright from "./Copyright";
import HelpComponent from '../components/Support/HelpComponent';


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

      <HelpComponent/>
        <Copyright />
     
      </footer>
      {/* End footer */}
    </>
  );
}
