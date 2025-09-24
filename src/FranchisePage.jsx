import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/franchise/loginForm/LoginForm";
import RegForm from "./components/franchise/regForm/RegForm";

const FranchisePage = () => {
  return (
    <>
      <Header />
      <div className="franchise-page-container">
        <section className="franchise-registration">
          <RegForm />
        </section>
        <section className="admin-login">
          <LoginForm />
        </section>
      </div>
      <Footer /> 
    </>
  );
};

export default FranchisePage;