// Contact.jsx
import axios from "axios";
import { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://localhost:8800/server/contact/sendMessage",
        formData
      );

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have questions, feedback, or
        need support, feel free to reach out using any of the options below.
      </p>

      {/* Contact Options */}
      <div className="contact-options">
        {/* Phone */}
        <div className="contact-card">
          <img src="images/whatApp.png" alt="Call Icon" className="contact-icon" />
          <h3>Call Us</h3>
          <p>
            <a href="tel:+254-792079900" className="contact-link">
              +254-792-079900
            </a>
          </p>
        </div>

        {/* Email */}
        <div className="contact-card">
          <img src="images/email.png" alt="Email Icon" className="contact-icon" />
          <h3>Email Us</h3>
          <p>
            <a href="mailto:info@agriconnect.com" className="contact-link">
              info@agriconnect.com
            </a>
          </p>
        </div>

        {/* Facebook */}
        <div className="contact-card">
          <img src="images/fb.jpg" alt="Facebook Icon" className="contact-icon" />
          <h3>Follow on Facebook</h3>
          <p>
            <a
              href="https://www.facebook.com/agriconnectkenya"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              @AgriConnectKenya
            </a>
          </p>
        </div>

        {/* Twitter */}
        <div className="contact-card">
          <img src="images/twitter.png" alt="Twitter Icon" className="contact-icon" />
          <h3>Follow on Twitter</h3>
          <p>
            <a
              href="https://twitter.com/agriconnectke"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              @AgriConnectKE
            </a>
          </p>
        </div>
      </div>
      {status && <p className="mt-3 text-center">{status}</p>}
      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
