"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNote from "../note/page";
import styles from "./note-list.module.css";
import { PiTrashLight as Trash } from "react-icons/pi";
import { VscClose as Close } from "react-icons/vsc";
import { IoCheckmark as Save } from "react-icons/io5";
import { LiaExpandSolid as Expand } from "react-icons/lia";

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

  // EDIT NOTE
  const editNote = async (noteId: string, content: string) => {
    setEditingNote(noteId);
    setEditedContent(content);
  };

  // SAVE EDITED NOTE
  const saveEditedNote = async (noteId: string, newContent?: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/notes/${noteId}`,
        { content: newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingNote(null);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, content: newContent } : note
        )
      );
    } catch (error) {
      console.error("Error saving edited note:", error);
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
        {loading}
        {error && <p>{error}</p>}

        <div className={styles.noteList}>
          {notes.map((note) => (
            <div
              key={note._id}
              className={`${styles.note} ${
                expandedNote === note._id && styles.fullScreen
              }`}
            >
              <div className={styles.actions}>
                {expandedNote === note._id && (
                  <div>
                    <EditBar />
                  </div>
                )}
                <div>
                  {expandedNote === note._id && (
                    <Trash
                      className={styles.icons}
                      onClick={() => deleteNote(note._id)}
                      title="Radera"
                    />
                  )}
                  <Expand
                    className={`${styles.icons} ${
                      expandedNote === note._id ? "" : styles.expandIcon
                    }`}
                    onClick={() => expandNote(note._id)}
                    title="Expandera"
                  />
                </div>
              </div>

              <div className={styles.noteContent}>
                {expandedNote === note._id ? (
                  <>
                    {editingNote === note._id ? (
                      <div className={styles.editableText}>
                        <p
                          contentEditable="true"
                          suppressContentEditableWarning={true}
                          className={styles.customEditableText}
                          onBlur={(e) => {
                            const newContent = e.target.textContent;
                            setEditingNote(null);
                            saveEditedNote(note._id, newContent);
                          }}
                        >
                          {note.content}
                        </p>
                        <div className={styles.iconContainer}>
                          <Save
                            onClick={() => saveEditedNote(note._id)}
                            title="Spara ändringar"
                          />
                          <Close
                            onClick={() => setEditingNote(null)}
                            title="Ångra ändringar"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.editableText}>
                        <p onClick={() => editNote(note._id, note.content)}>
                          {note.content}
                        </p>
                      </div>
                    )}
                  </>
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
