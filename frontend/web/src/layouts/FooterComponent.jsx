import React  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from "react-router-dom";
//material
import Link from '@material-ui/core/Link';

//local

import Copyright from "./Copyright";
import { routes } from "../Routes";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    bottom:0,
  },
}));

export default function FooterComponent() {
  const history = useHistory();

const handleRouteClick = (route) => {
  history.push(route);
  };
  
  const classes = useStyles();
  return (
    <>
      {/* Footer */}
      <footer className={classes.footer} >
      <Link
onClick={() => handleRouteClick(routes.help)}
variant="body2"
component="button"
color="secondary"
style={{fontWeight:800,fontSize:".8em"}}
>
{"Need Help?"}
</Link>
      
        <Copyright />
     
      </footer>
      {/* End footer */}
    </>
  );
}
