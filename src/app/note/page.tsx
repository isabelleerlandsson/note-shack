"use client";
import React, { useState } from "react";
import { PiNotePencilLight as NewNote } from "react-icons/pi";
import { VscClose as Close } from "react-icons/vsc";
import { IoCheckmark as Save } from "react-icons/io5";

import { createReactEditorJS } from "react-editor-js";
import CheckList from "@editorjs/checklist";
import List from "@editorjs/list";
import Table from "@editorjs/table";

import styles from "./note.module.css";
import EditBar from "@/components/EditBar/page";

const ReactEditorJS = createReactEditorJS();

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
  const [noteColor, setColor] = useState("#ade8b5");

  const editorCore = React.useRef(null);

  // INITIALIZE EDIT
  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  // SHOW CREATE NEW NOTE FORM
  const handlePlusClick = () => {
    setShowInput(true);
  };

  // SEND NEW NOTE TO SERVER
  const handleNoteSubmit = async () => {
    try {
      const savedData = await editorCore.current.save();
      const blocks = savedData["blocks"];

      await handleCreateNote("", blocks, noteColor);
      setContent("");
      setColor("#ade8b5");
      setShowInput(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // CLOSE NEW NOTE WITHOUT SAVE
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
              <div className={styles.editbar}>
                <div>
                  <EditBar noteId={null} onColorChange={changeColor} />
                </div>
                <div>
                  <Save onClick={handleNoteSubmit} title="Spara anteckning" />
                  <Close onClick={handleClose} title="Stäng" />
                </div>
              </div>
            </label>
            <ReactEditorJS
              onInitialize={handleInitialize}
              tools={{ checkList: CheckList, list: List, table: Table }}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
