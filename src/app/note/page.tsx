"use client";
import React, { useState } from "react";
import { PiNotePencilLight as Plus } from "react-icons/pi";
import { VscClose as Close } from "react-icons/vsc";
import { IoCheckmark as Save } from "react-icons/io5";

import styles from "./note.module.css";
import EditBar from "@/components/EditBar/page";

interface Note {
  _id: string;
  title: string;
  content: string;
}
interface CreateNoteProps {
  handleCreateNote: (title: string, content: string) => Promise<void>;
}

const CreateNote: React.FC<CreateNoteProps> = ({ handleCreateNote }) => {
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handlePlusClick = () => {
    setShowInput(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNoteSubmit = async () => {
    try {
      await handleCreateNote("", content);
      setContent("");
      setShowInput(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleClose = () => {
    setShowInput(false);
  };

  return (
    <div className={styles.container}>
      <h1>Skapa anteckning</h1>
      <div
        className={`${styles.createNote} ${styles.icons}`}
        onClick={handlePlusClick}
      >
        <Plus />
      </div>
      {showInput && (
        <div
          className={`${styles.expanded} ${styles.newNote} ${styles.fullScreen}`}
        >
          <form className={styles.form} onSubmit={handleNoteSubmit}>
            <label className={`${styles.icons} ${styles.iconPosition}`}>
              <div>
                <EditBar />
              </div>
              <div>
                <Save onClick={handleNoteSubmit} />
                <Close onClick={handleClose} />
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
