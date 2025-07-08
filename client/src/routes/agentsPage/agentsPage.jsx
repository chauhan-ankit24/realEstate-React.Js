import { useState, useEffect } from "react";
import "./agentsPage.scss";
import apiRequest from "../../lib/apiRequest";

function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/users");
        
        // Transform user data to agent format
        const agentsData = response.data.map((user, index) => ({
          id: user.id,
          name: user.username,
          title: getRandomTitle(),
          experience: getRandomExperience(),
          location: getRandomLocation(),
          phone: generatePhoneNumber(),
          email: user.email,
          specialization: getRandomSpecialization(),
          properties: getRandomProperties(),
          rating: getRandomRating(),
          image: user.avatar || "/noavatar.jpeg",
          joinedDate: new Date(user.createdAt).getFullYear()
        }));
        
        setAgents(agentsData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper functions to generate random agent data
  const getRandomTitle = () => {
    const titles = [
      "Senior Property Consultant",
      "Residential Specialist", 
      "Investment Advisor",
      "Commercial Expert",
      "Luxury Property Consultant",
      "Rental Specialist"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomExperience = () => {
    const years = Math.floor(Math.random() * 10) + 3;
    return `${years}+ Years`;
  };

  const getRandomLocation = () => {
    const locations = [
      "Mumbai, Delhi",
      "Bangalore, Chennai", 
      "Gurgaon, Noida",
      "Pune, Hyderabad",
      "Mumbai, Pune",
      "Bangalore, Hyderabad"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const generatePhoneNumber = () => {
    const number = Math.floor(Math.random() * 900000000) + 9100000000;
    return `+91 ${number.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1$2$3')}`;
  };

  const getRandomSpecialization = () => {
    const specializations = [
      "Luxury Apartments, Commercial Spaces",
      "Residential Villas, Apartments",
      "Investment Properties, Builder Floors", 
      "Office Spaces, Retail Properties",
      "Luxury Villas, Penthouses",
      "Rental Properties, PG Accommodations"
    ];
    return specializations[Math.floor(Math.random() * specializations.length)];
  };

  const getRandomProperties = () => {
    const count = Math.floor(Math.random() * 200) + 50;
    const type = Math.random() > 0.5 ? "Properties Sold" : "Properties Rented";
    return `${count}+ ${type}`;
  };

  const getRandomRating = () => {
    return (Math.random() * 0.5 + 4.5).toFixed(1);
  };

  if (loading) {
    return (
      <div className="agentsPage">
        <div className="container">
          <div className="loading">
            <h2>Loading our expert agents...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agentsPage">
        <div className="container">
          <div className="error">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agentsPage">
      <div className="container">
        <div className="header">
          <h1>Our Expert Agents</h1>
          <p>
            Meet our team of certified real estate professionals who are dedicated to 
            helping you find your perfect property. Each agent brings years of experience 
            and local market expertise to ensure you get the best deals.
          </p>
        </div>

        <div className="agentsGrid">
          {agents.map((agent) => (
            <div key={agent.id} className="agentCard">
              <div className="agentImage">
                <img src={agent.image} alt={agent.name} />
                <div className="rating">
                  <span>⭐ {agent.rating}</span>
                </div>
              </div>
              
              <div className="agentInfo">
                <h3>{agent.name}</h3>
                <p className="title">{agent.title}</p>
                <p className="experience">{agent.experience} Experience</p>
                
                <div className="details">
                  <div className="detail">
                    <span className="label">📍 Location:</span>
                    <span>{agent.location}</span>
                  </div>
                  <div className="detail">
                    <span className="label">🏠 Specialization:</span>
                    <span>{agent.specialization}</span>
                  </div>
                  <div className="detail">
                    <span className="label">📊 Track Record:</span>
                    <span>{agent.properties}</span>
                  </div>
                </div>

                <div className="contact">
                  <button className="callBtn">
                    📞 Call
                  </button>
                  <button className="emailBtn">
                    📧 Email
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="joinTeam">
          <h2>Want to Join Our Team?</h2>
          <p>We're always looking for talented real estate professionals to join our growing team.</p>
          <button className="joinBtn">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

export default AgentsPage;
