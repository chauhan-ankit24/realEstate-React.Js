import { useState } from "react";
import "./contactPage.scss";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contactPage">
      <div className="container">
        <div className="contactInfo">
          <h1>Get in Touch</h1>
          <p>
            Have questions about properties or need assistance? Our team is here to help you 
            find your perfect home. Reach out to us through any of the channels below.
          </p>

          <div className="contactMethods">
            <div className="method">
              <div className="icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+91 9876543210</p>
                <p>Mon-Sat: 9 AM - 7 PM</p>
              </div>
            </div>

            <div className="method">
              <div className="icon">📧</div>
              <div>
                <h3>Email Us</h3>
                <p>info@ghardekho.com</p>
                <p>We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="method">
              <div className="icon">📍</div>
              <div>
                <h3>Visit Us</h3>
                <p>123 Business Plaza, Connaught Place</p>
                <p>New Delhi, India - 110001</p>
              </div>
            </div>

            <div className="method">
              <div className="icon">💬</div>
              <div>
                <h3>Live Chat</h3>
                <p>Available 24/7</p>
                <p>Get instant support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contactForm">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submitBtn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
