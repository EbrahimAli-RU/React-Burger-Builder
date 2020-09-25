import React from "react";

import Classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
  <header className={Classes.Toolbar}>
    <DrawerToggle clicked={props.open} />
    <div className={Classes.Logo}>
      <Logo />
    </div>
    <nav className={Classes.DestopOnly}>
      <NavigationItems isAuthenticate={props.isAuthenticate} />
    </nav>
  </header>
);

export default Toolbar;
