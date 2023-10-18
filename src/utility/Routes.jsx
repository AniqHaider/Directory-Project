import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetails from "../components/UserDetails"; 
import UserPostsList from "../components/UserPostsList";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPostsList />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
