import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";

function MainRouter() {
   return (
      <>
      <Navbar />
      </>
   )
}

export default MainRouter;