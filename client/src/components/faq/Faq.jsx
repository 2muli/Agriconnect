import "./faq.css";
const Faq = () => {
  return (
    <>
      <section className="help-section1">
        <h2 style={{ marginBottom: "30px" }}>
          Frequently Asked Questions (FAQs)
        </h2>
        <details>
          <summary>How do I register as a farmer?</summary>
          <p>
            Click on "Sign Up" and select the "Farmer" option. Fill out the
            required details and verify your account.
          </p>
        </details>
        <details>
          <summary>Can I list multiple crops at once?</summary>
          <p>
            Yes, you can list multiple crops simultaneously by adding them to
            your dashboard.
          </p>
        </details>
        <details>
          <summary>Is my payment secure?</summary>
          <p>
            Absolutely! We use trusted payment gateways like M-Pesa to ensure
            secure transactions.
          </p>
        </details>
      </section>
    </>
  );
};

export default Faq;
