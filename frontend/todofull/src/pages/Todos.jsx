import { useEffect, useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState();
  const [title, setTitle] = useState({ title: "" });
  const [token, setToken] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // console.log(token);
    setToken(token);
    fetch(`http://localhost:8080/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setTodos(res.todos))
      .catch((err) => console.log(err));
  }, [reload]);

  const handleStatusToggle = (id, status) => {
    const newStatus = !status;
    fetch(`http://localhost:8080/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          onChange={(e) => setTitle({ ...title, title: e.target.value })}
          placeholder="Enter your items..."
        />
        <button
          onClick={() => {
            // console.log(title)
            fetch(`http://localhost:8080/todo`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
              },
              body: JSON.stringify(title),
            })
              .then((res) => res.json())
              .then((res) => {
                setReload(!reload);
              })
              .catch((err) => console.log(err));
          }}
        >
          +
        </button>
        {todos
          ? todos.map((ele, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 20,
                }}
              >
                <p>{ele.title}</p>
                <button onClick={() => handleStatusToggle(ele._id, ele.status)}>
                  {ele.status ? "True" : "False"}
                </button>
                <button
                  onClick={() => {
                    // console.log(title)
                    fetch(`http://localhost:8080/todo/${ele._id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${token}`,
                      },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        setReload(!reload);
                      })
                      .catch((err) => console.log(err));

                    // console.log(ele._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Todos;
