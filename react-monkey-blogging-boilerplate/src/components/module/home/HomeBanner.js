import React from "react";
import styled from "styled-components";
import { Button } from "../../button";
import { useNavigate } from "react-router-dom";

const HomePageStyles = styled.div`
  min-height: 520px;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-content {
      max-width: 400px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <HomePageStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ab
              alias sed corporis velit aut, facilis veritatis accusantium
              eveniet doloremque, voluptatum accusamus hic totam, tempore sit
              aliquid dolore officia! Voluptatum.
            </p>
            <Button to="/sign-up" onClick={() => navigate("sign-up")}>
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet="/img-banner.png 2x" alt="banner" />
          </div>
        </div>
      </div>
    </HomePageStyles>
  );
};

export default HomeBanner;
