import { Link } from 'react-router-dom';
import './about.css'; // Optional: Add CSS for styling

const About = () => {
  return (
    <div className="about-container2">
      <section className="about-section1">
        <h2>What is AgriConnect?</h2>
        <p>
          AgriConnect is a revolutionary digital platform designed to empower farmers and buyers in Kenya by simplifying the agricultural supply chain. Our mission is to create a seamless connection between farmers and buyers, ensuring fair prices, efficient transactions, and improved livelihoods for all stakeholders involved.
        </p>
        <p>
          At AgriConnect, we believe that technology has the power to transform traditional farming practices into modern, sustainable, and profitable ventures.
        </p>
        <h2>Why AgriConnect Matters</h2>
        <ul>
          <li>Improving Market Access: Farmers can now list their produce online and connect with buyers across the country.</li>
          <li>Enhancing Transparency: Real-time price tracking allows farmers to stay informed about market trends.</li>
          <li>Facilitating Secure Transactions: Integrated payment systems like M-Pesa ensure safe and convenient transactions.</li>
          <li>Promoting Sustainability: Educational resources help farmers adopt sustainable farming techniques.</li>
        </ul>
        <h2>Key Features of AgriConnect</h2>
        <h3>For Farmers:</h3>
        <ul>
          <li>List Your Produce Easily: Post details about your crops, including type, quantity, price, and harvest date.</li>
          <li>Track Orders in Real-Time: Monitor incoming orders and manage your sales effortlessly.</li>
          <li>Access Price Trends: Stay updated with the latest crop prices in different regions to optimize your earnings.</li>
          <li>Learn Best Practices: Explore our library of articles, videos, and tips to improve your farming skills.</li>
        </ul>
        <h3>For Buyers:</h3>
        <ul>
          <li>Search and Discover Crops: Browse through a variety of fresh produce listed by verified farmers.</li>
          <li>Place Orders Securely: Purchase directly from farmers and pay using secure payment methods.</li>
          <li>Receive Quality Products: Rest assured that all produce is sourced from trusted suppliers who adhere to high standards.</li>
        </ul>
        <h2>The Impact of AgriConnect</h2>
        <p>Since its launch, AgriConnect has made a significant difference in the lives of thousands of farmers and buyers across Kenya:</p>
        <ul>
          <li>Connected 1,000+ Farmers with Buyers.</li>
          <li>Facilitated Over KES 1M in Transactions.</li>
          <li>Improved Crop Prices for Farmers by 20%.</li>
          <li>Promoted Sustainable Farming Practices.</li>
        </ul>
        <h2>Join the AgriConnect Community Today!</h2>
        <p>
          Whether you're a farmer looking to expand your reach or a buyer seeking quality produce, AgriConnect is here to support you every step of the way. Together, we can build a brighter future for Kenyan agriculture.
        </p>
        <Link to="/register" ><button style={{marginBottom:"30px"}}>Sign Up Now</button></Link>
      </section>
      </div>
  );
};

export default About;