import React from "react";

const Register = () => {
  return (
    <form className="register">
      <label>Register:</label>
      <input type="text" placeholder="firstName here " />
      <input type="text" placeholder="lastName here " />
      <input type="number" placeholder="age here " />
      <input type="text" placeholder="country here " />
      <input type="text" placeholder="email here " />
      <input type="password" placeholder="password here " />
      <button>Register</button>
    </form>
  );
};

export default Register;
