import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="Jumbo">
        <Link className="Link White JumboSelector Selector-Movies" to="/movies">
          <h1>Movie</h1>
        </Link>
        <Link className="Link White JumboSelector Selector-TVSeries" to="/tv">
          <h1>TV Series</h1>
        </Link>
      </div>
    </div>
  );
}

export default Home;
