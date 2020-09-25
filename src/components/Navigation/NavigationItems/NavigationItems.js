import React from "react";

import Classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem Link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem Link="/orders">Orders</NavigationItem>
    {props.isAuthenticate ? (
      <NavigationItem Link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem Link="/auth">Authentication</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
