"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNote from "../note/page";
import styles from "./note-list.module.css";
import { VscEdit as Edit } from "react-icons/vsc";
import { TfiCheck as Save } from "react-icons/tfi";
import { PiTrashLight as Trash } from "react-icons/pi";

import EditBar from "@/components/EditBar/page";

interface Note {
  _id: string;
  title: string;
  content: string;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleCreateNote = async (title: string, content: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post<Note>(
        "http://localhost:5001/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const token = localStorage.getItem("token");
      const response = await axios.get<Note[]>("http://localhost:5001/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Kunde inte hämta anteckningar");
      setLoading(false);
    }
  };

  // EXPAND NOTE
  const expandNote = (noteId: string) => {
    if (expandedNote === noteId) {
      setExpandedNote(null);
    } else {
      setExpandedNote(noteId);
    }
  };

  // DELETE NOTE
  const deleteNote = async (noteId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Ta bort anteckningen från lokal state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className={styles.container}>
      <CreateNote handleCreateNote={handleCreateNote} />

      <div className={styles.allNotes}>
        <h2>Alla anteckningar</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className={styles.noteList}>
          {notes.map((note) => (
            <div
              key={note._id}
              className={`${styles.note} ${
                expandedNote === note._id && styles.fullScreen
              }`}
              onClick={() => expandNote(note._id)}
            >
              {expandedNote === note._id && (
                <div className={styles.actions}>
                  <EditBar />
                  <Trash onClick={() => deleteNote(note._id)} />
                </div>
              )}

              <div className={styles.noteContent}>
                {editingNote === note._id ? (
                  <textarea
                    className={styles.textarea}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p>{note.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
