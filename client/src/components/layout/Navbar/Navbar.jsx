import React from "react";

import Google from "../../auth/Google";
import Facebook from "../../auth/Facebook";

function Navbar() {
  return (
    <header className="page-header">
      <div className={"logo"}></div>
      <div>
      <Google />
      <Facebook />
      </div>
    </header>
  );
}

export default Navbar;
