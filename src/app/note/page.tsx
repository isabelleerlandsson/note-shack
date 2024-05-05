"use client";
import React, { useState } from "react";
import { TfiPlus as Plus } from "react-icons/tfi";
import { VscClose } from "react-icons/vsc";
import { IoCheckmark } from "react-icons/io5";
import { LiaExpandSolid } from "react-icons/lia";

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
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handlePlusClick = () => {
    setShowInput(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Försöker skicka POST-förfrågan...");
    try {
      await handleCreateNote("", content);
      setContent("");
      setShowInput(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
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
          className={`${styles.expanded} ${styles.newNote} ${
            expanded && styles.fullScreen
          }`}
        >
          <form className={styles.form} onSubmit={handleNoteSubmit}>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={handleContentChange}
              autoFocus
            />
            <div className={styles.expander} onClick={toggleExpand}>
              <LiaExpandSolid />
            </div>
            <label className={styles.icons}>
              <IoCheckmark />
              <VscClose />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
