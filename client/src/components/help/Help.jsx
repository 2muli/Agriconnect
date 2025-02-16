import './help.css'; // Import CSS for styling

const Help = () => {
  return (
    <div className="help-container">
      {/* Main Title */}
      <h1 className="help-title">How to Use AgriConnect</h1>

      {/* Introduction Section */}
      <section className="help-section">
        <h2 className="help-header">Getting Started</h2>
        <div className="help-content">
          <p>
            Using AgriConnect is simple and intuitive. Follow these steps to get started:
          </p>
          <ol>
            <li>Register as a Farmer or Buyer: Create an account and complete your profile with essential details.</li>
            <li>List or Search for Produce: Farmers can list their crops, while buyers can search for fresh produce based on their needs.</li>
            <li>Complete Transactions Securely: Use our integrated payment system to finalize purchases quickly and safely.</li>
            <li>Stay Informed: Access valuable resources, weather updates, and market insights to enhance your experience.</li>
          </ol>
        </div>
        <h2 className="help-header">Guide for Farmers</h2>
        <div className="help-content">
          <h3 className="help-subheader">Step 1: Register as a Farmer</h3>
          <p>
            Sign up as a farmer by providing your name, location, and contact details. Verify your account to gain access to advanced features.
          </p>
          <h3 className="help-subheader">Step 2: List Your Produce</h3>
          <p>
            Post details about your crops, including the type, quantity, price, and harvest date. Use clear descriptions and images to attract buyers.
          </p>
          <h3 className="help-subheader">Step 3: Manage Orders</h3>
          <p>
            View incoming orders in real-time and accept/reject them based on availability. Track the status of each order until completion.
          </p>
          <h3 className="help-subheader">Step 4: Access Resources</h3>
          <p>
            Explore our library of educational resources to learn best practices for farming, pest control, and sustainability.
          </p>
        </div>
        <h2 className="help-header">Guide for Buyers</h2>
        <div className="help-content">
          <h3 className="help-subheader">Step 1: Register as a Buyer</h3>
          <p>
            Sign up as a buyer by providing your name, location, and contact details. Verify your account to start shopping.
          </p>
          <h3 className="help-subheader">Step 2: Search for Produce</h3>
          <p>
            Use our search feature to find fresh produce listed by verified farmers. Filter results by crop type, price, and location.
          </p>
          <h3 className="help-subheader">Step 3: Place Orders</h3>
          <p>
            Select the desired produce and place an order. Complete the transaction securely using our integrated payment system.
          </p>
          <h3 className="help-subheader">Step 4: Receive Products</h3>
          <p>
            Track the delivery status of your order and receive high-quality products directly from trusted farmers.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Help;