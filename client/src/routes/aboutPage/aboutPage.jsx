import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="container">
        <div className="textContainer">
          <h1>About GharDekho</h1>
          <p>
            GharDekho is India's leading real estate platform, connecting millions of buyers, 
            sellers, and renters with their perfect properties. Since our inception, we've been 
            committed to making property transactions transparent, efficient, and hassle-free.
          </p>
          
          <div className="features">
            <div className="feature">
              <h3>🏠 Verified Properties</h3>
              <p>All listings are verified by our expert team to ensure authenticity and accuracy.</p>
            </div>
            <div className="feature">
              <h3>📍 Pan India Presence</h3>
              <p>Covering 25+ major cities across India with local market expertise.</p>
            </div>
            <div className="feature">
              <h3>💼 Expert Guidance</h3>
              <p>Our certified agents provide professional guidance throughout your property journey.</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure Transactions</h3>
              <p>End-to-end secure transaction process with legal documentation support.</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <h2>50K+</h2>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h2>10,000+</h2>
              <p>Properties Listed</p>
            </div>
            <div className="stat">
              <h2>25+</h2>
              <p>Cities Covered</p>
            </div>
            <div className="stat">
              <h2>15+</h2>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
        
        <div className="imageContainer">
          <img src="/bg.png" alt="About GharDekho" />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
