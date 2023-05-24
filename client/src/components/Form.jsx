import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const FormA = () => {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  const createUser = () => {
    axios
      .post("http://localhost:4000/setUsers", { name, age, username })
      .then((res) => {
        alert("user created!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "500px",
          width: "500px",
          gap: "1rem",
        }}
      >
        <TextField
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          placeholder="Name"
        />
        <TextField
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          name="age"
          placeholder="Age"
        />
        <TextField
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          name="username"
          placeholder="User Name"
        />
        <Button onClick={createUser} color="primary" variant="contained">
          Button
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {listOfUsers.map((user) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "500px",
                width: "500px",
                gap: "1rem",
              }}
            >
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormA;
