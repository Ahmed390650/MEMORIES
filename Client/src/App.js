import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/postdetails/PostDetails.jsx";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
const App = () => {
  const user = JSON.stringify(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Navigate to="/posts" /> : <Auth />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
