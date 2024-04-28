"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./note.module.css";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface CreateNoteProps {
  handleCreateNote: (title: string, content: string) => Promise<void>;
}

const CreateNote: React.FC<CreateNoteProps> = ({ handleCreateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prevNotes, setPrevNotes] = useState<Note[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Försöker skicka POST-förfrågan...");
    try {
      await handleCreateNote(title, content);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      const response = await axios.post<Note>("http://localhost:3000/notes", {
        title,
        content,
      }); // Här lägger du till den fullständiga URL:en
      console.log("Note created:", response.data);
      setPrevNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Create a New Note</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Innehåll:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Spara</button>
        </form>
      </div>
    </>
  );
};

export default CreateNote;
