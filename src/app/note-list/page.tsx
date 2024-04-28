"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNote from "../note/page";

interface Note {
  _id: string;
  title: string;
  content: string;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreateNote = async (title: string, content: string) => {
    try {
      const response = await axios.post<Note>("http://localhost:3000/notes", {
        title,
        content,
      });
      console.log("Note created:", response.data);
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>("http://localhost:3000/notes");
      setNotes(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Kunde inte hämta anteckningar");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Alla anteckningar</h2>
      {loading && <p>Laddar...</p>}
      {error && <p>{error}</p>}
      <CreateNote handleCreateNote={handleCreateNote} />
      <div>
        {Array.isArray(notes) ? (
          notes.map((note) => (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p>Inga anteckningar tillgängliga</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
