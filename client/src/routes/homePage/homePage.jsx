import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover Your Perfect Home in India</h1>
          <p className="description">
            Find premium residential and commercial properties across major
            Indian cities. From luxury apartments in Mumbai to spacious villas
            in Bangalore, explore verified listings with transparent pricing and
            hassle-free documentation.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>15+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>50K+</h1>
              <h2>Happy Families</h2>
            </div>
            <div className="box">
              <h1>10,000+</h1>
              <h2>Properties Listed</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Indian Real Estate" />
        <div className="overlay">
          <div className="stats">
            <div className="stat">
              <h3>₹2.5 Cr+</h3>
              <p>Properties Worth</p>
            </div>
            <div className="stat">
              <h3>25+</h3>
              <p>Indian Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
