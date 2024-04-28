"use client";

import React, { useState } from "react";

import styles from "./createaccount.module.css";

interface CreateAccountProps {
  onSubmit: (userData: UserData) => void;
}

interface UserData {
  username: string;
  password: string;
  email: string;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Ny användare skapad:", data);
      window.location.href = "/create-note";
    } catch (error) {
      console.error("Fel vid skapande av användare:", error);
    }
  };

  return (
    <>
      <div className={styles.circle}></div>
      <div className={styles.circleTwo}></div>
      <div className={styles.header}></div>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.login}>
            <h1>Skapa konto</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Användarnamn"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Lösenord"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-postadress"
              required
            />
            <button className={styles.button} type="submit">
              Skapa konto
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
