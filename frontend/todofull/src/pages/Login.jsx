import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <input
        type="text"
        name="email"
        onChange={(e) => handleInput(e)}
        placeholder="Enter your email"
      />
      <input
        type="text"
        name="password"
        onChange={(e) => handleInput(e)}
        placeholder="Enter your password"
      />
      <button
        onClick={() => {
          fetch(`http://localhost:8080/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((res) =>
              localStorage.setItem("access_token", res.access_token)
            )
            .catch((err) => console.log(err));
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
