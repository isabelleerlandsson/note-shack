"use client";
import React, { useState } from "react";
import { PiNotePencilLight as NewNote } from "react-icons/pi";
import { VscClose as Close } from "react-icons/vsc";
import { IoCheckmark as Save } from "react-icons/io5";
import axios from "axios";

import styles from "./note.module.css";
import EditBar from "@/components/EditBar/page";

interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
}
interface CreateNoteProps {
  handleCreateNote: (
    title: string,
    content: string,
    color: string
  ) => Promise<void>;
}

const CreateNote: React.FC<CreateNoteProps> = ({ handleCreateNote }) => {
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [noteColor, setColor] = useState("");

  const handlePlusClick = () => {
    setShowInput(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNoteSubmit = async () => {
    try {
      console.log(noteColor);
      await handleCreateNote("", content, noteColor);
      setContent("");
      setColor("");
      setShowInput(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleClose = () => {
    setShowInput(false);
  };

  // CHANGE COLOR
  const changeColor = async (noteId: string, newColor?: string) => {
    try {
      setColor(newColor);
    } catch (error) {
      console.error("Error changing color:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.createNote} ${styles.icons}`}
        onClick={handlePlusClick}
      >
        <NewNote title="Skapa en ny anteckning" />
      </div>
      {showInput && (
        <div
          className={`${styles.newNote} ${styles.fullScreen}`}
          style={{ backgroundColor: noteColor }}
        >
          <form className={styles.form} onSubmit={handleNoteSubmit}>
            <label className={`${styles.icons} ${styles.iconPosition}`}>
              <div>
                <EditBar noteId={null} onColorChange={changeColor} />
              </div>
              <div>
                <Save onClick={handleNoteSubmit} title="Spara anteckning" />
                <Close onClick={handleClose} title="Stäng" />
              </div>
            </label>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={handleContentChange}
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
