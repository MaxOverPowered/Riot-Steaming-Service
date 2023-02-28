import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getCurrentUser, getUserId, login } from "../util/ApiUtils";
import { ACCESS_TOKEN } from "../constants";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginForm() {
  const [usernameOrEmail, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("values");
    console.log(usernameOrEmail);
    console.log(password);
    login({ usernameOrEmail, password })
      .then((response) => {
        console.log(response.json);
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        getUserId(usernameOrEmail).then((data) =>
          localStorage.setItem("userId", data.id)
        );
        getCurrentUser();
        if (localStorage.getItem("from")) {
          navigate(localStorage.getItem("from"));
          localStorage.removeItem("from");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            description:
              "Your Username or Password is incorrect. Please try again!",
          });
        } else {
          notification.error({
            description:
              error.message || "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  };

  return (
    <Container>
      <Navbar showSearchBox={false} />
      <div className="fixed inset-0 flex justify-center items-center">
        <form
          className="font-sans font-semibold"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usernameOrEmail"
            name="usernameOrEmail"
            label="Email Address"
            style={{ backgroundColor: "white" }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            style={{ backgroundColor: "white" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="signup-form-button"
            style={{
              backgroundColor: "#9932CC",
              color: "white",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ec4899")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#9932CC")
            }
          >
            Sign in
          </Button>
          <p style={{ color: "#9932CC", textAlign: "center" }}>
            Don't Have an Account? <Link to="/auth/register">Register!</Link>
          </p>
        </form>
      </div>
      <Footer></Footer>
    </Container>
  );
}
