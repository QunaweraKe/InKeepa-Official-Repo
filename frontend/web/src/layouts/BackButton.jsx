import React from "react";
import { useHistory } from 'react-router-dom';

// Material UI

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "@material-ui/core/Button";


export default function BackButtonComponent() {

    const history = useHistory();
 

  return (
    <>
      <Button
          style={{marginBottom:5,}}
      variant="contained"
      color="secondary"
      onClick={() => history.goBack()}
    >
      < KeyboardBackspaceIcon />Back
    </Button>
      </>
  );
}

