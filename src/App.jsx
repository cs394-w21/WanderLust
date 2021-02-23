import React from "react";
import { NavbarProvider } from "./utils/useNavbarContext.js";
import ExplorePage from "./pages/ExplorePage";

const App = () => {
  return (
    <NavbarProvider>
      <ExplorePage />
    </NavbarProvider>
  );
};

export default App;
