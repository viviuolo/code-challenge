import React, { Component } from "react";

import Header from "./Header/index";
import Footer from "./Footer/index";
import MainContent from "./MainContent/index";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
