import { NavLink } from "react-router-dom";

const Navbar = () => {
  let list = [
    {
      to: "/signup",
      name: "Signup",
    },
    {
      to: "/login",
      name: "Login",
    },
    {
      to: "/todo",
      name: "Todo",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {list.map((ele) => (
          <NavLink key={ele.to} to={ele.to}>
            {ele.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
