"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/note";
    } catch (error) {
      setError("Fel användarnamn eller lösenord");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Extra hantering när formuläret skickas...");
    handleLogin(e);
  };

  return (
    <>
      <div className={styles.circle} />
      <div className={styles.circleTwo} />
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.login}>
            <h1>Logga in</h1>
          </div>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                placeholder="Användarnamn"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.button} type="submit">
              Logga in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
