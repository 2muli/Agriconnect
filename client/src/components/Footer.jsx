const Footer = () => {
    const footerStyle = {
        backgroundColor: "grey",
        color: "#333",
        padding: "10px 0",
        textAlign: "center",
        position: "fixed",
        fontSize: "14px",
        fontWeight: "bold",
        bottom: 0,
        width: "100%",
    };
    return (
        <footer style={footerStyle}>
            <p> &copy; 2025 Agriconnect. All rights reserved.</p>
        </footer>
    );
};  

export default Footer;