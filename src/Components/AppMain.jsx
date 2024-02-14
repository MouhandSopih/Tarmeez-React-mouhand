import HeaderPage from "./HeaderPage";

import Selectenew from "./PSelectenew";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AppMain() {
  

  return (
    <>
      <HeaderPage />
      <hr />
     
      <Selectenew />
    </>
  );
}
