import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const FormA = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
   
    axios.get("http://localhost:4000/countries").then((response) => {
      setCountryOptions(response.data);
    });
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState(""); 
    setCity(""); 

    axios.get("http://localhost:4000/countries").then((response) => {
      setStateOptions(response.data);
    });
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity(""); 

    
    axios.get("http://localhost:4000/countries").then((response) => {
      setCityOptions(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!validateForm()) {
      return;
    }

    axios
      .post("http://localhost:4000/setUsers", {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dateOfBirth,
        age,
      })
      .then(() => {
        alert("User created!");
        resetForm();
        window.location.reload(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    
    if (dateOfBirth) {
      const currentDate = new Date();
      const birthDate = new Date(dateOfBirth);
      const ageInMilliseconds = currentDate - birthDate;
      const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
      setAge(ageInYears);
    }
  }, [dateOfBirth]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCountry("");
    setState("");
    setCity("");
    setGender("");
    setDateOfBirth("");
    setAge("");
  };

  const validateForm = () => {
    
    if (firstName.trim() === "") {
      alert("Please enter a valid first name.");
      return false;
    }

    
    if (lastName.trim() === "") {
      alert("Please enter a valid last name.");
      return false;
    }

    
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (country.trim() === "") {
      alert("Please select a valid country.");
      return false;
    }

    
    if (state.trim() === "") {
      alert("Please select a valid state.");
      return false;
    }

    
    if (city.trim() === "") {
      alert("Please select a valid city.");
      return false;
    }

       if (gender === "") {
      alert("Please select a valid gender.");
      return false;
    }

    if (!validateDateOfBirth(dateOfBirth)) {
      alert("Please enter a valid date of birth (minimum age is 14).");
      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDateOfBirth = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);

    
    return currentDate.getFullYear() - inputDate.getFullYear() >= 14;
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          background: "white",
          borderRadius: "10px",
          padding: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          required
        />
        <TextField
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          required
        />
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-Mail"
          required
        />
        <Select
          value={country}
          onChange={handleCountryChange}
          label="Country"
          required
        >
          {countryOptions.map((country) => (
            <MenuItem key={country._id} value={country.country}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={state}
          onChange={handleStateChange}
          label="State"
          required
        >
          {stateOptions.map((state) => (
            <MenuItem key={state._id} value={state.state}>
              {state.state}
            </MenuItem>
          ))}
        </Select>
        <Select value={city} onChange={(e) => setCity(e.target.value)} label="City" required>
          {cityOptions.map((city) => (
            <MenuItem key={city._id} value={city.city}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
        <div id="genderInput">
          <label htmlFor="gender">Gender</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <TextField
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          label="Date of Birth"
          required
        />
        <TextField type="text" value={age} label="Age" disabled />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormA;

