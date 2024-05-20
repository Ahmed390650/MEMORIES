import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/home/Home";
import {BrowserRouter ,Route, Routes} from 'react-router-dom'
import Auth from "./components/Auth/Auth";
const App = () => {
 
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Container>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Auth/>} path="/auth"/>
        </Routes>
      </Container>
    </Container>
    </BrowserRouter>
  );
};

export default App;
