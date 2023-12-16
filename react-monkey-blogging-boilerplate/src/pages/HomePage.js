import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-config";
import styled from "styled-components";
import Header from "../components/layout/Header";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <Header></Header>

      {/* <button onClick={handleSignOut}>Sign out</button> */}
    </HomePageStyles>
  );
};

export default HomePage;
