import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  useEffect(() => {
    props.setTopBar("Home");
  }, []); 

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Nguyen Mau Phi Hung
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h5" color="inherit">
          {props.topBar}
          {props.topBar === "User Photos | Advanced Features" &&
            <>
              <input type="radio" name="advanced" onChange={()=>{props.setAdvanced(true)}} />agree
              <input type="radio" name="advanced" onChange={()=>{props.setAdvanced(false)}} />degree
            </>
          }
        </Typography>
      </Toolbar>
    </AppBar >
  );
}

export default TopBar;
