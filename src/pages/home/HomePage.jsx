import React from "react";
import HomeTree from "./components/HomeTree";
import NewHome from "./components/newHome";

const HomePage = () => {
  return (
    <section className="p-10 font-montserrat">
      <div>
        <HomeTree />
        {/* <NewHome /> */}
      </div>
    </section>
  );
};

export default HomePage;
