import React from "react";

import HomeJumbotron from "./HomeJumbotron/HomeJumbotron";
import HomeList from "./HomeList/HomeList";

import "./Home.scss";

const Home = () => (
  <main>
    <HomeJumbotron />
    <hr className="hr-75 hr-rounded-warning" />
    <HomeList />
    <hr className="hr-75 hr-rounded-warning" />
  </main>
);

export default Home;
