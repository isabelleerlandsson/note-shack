"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNote from "../../note/page";
import styles from "./note-list.module.css";
import { PiTrashLight as Trash } from "react-icons/pi";
import { VscClose as Close } from "react-icons/vsc";
import { IoCheckmark as Save } from "react-icons/io5";
import { LiaExpandSolid as Expand } from "react-icons/lia";
import { IoShareSocialOutline as Share } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import Toast from "@/components/Toast/page";

import EditBar from "@/components/EditBar/page";
import Navbar from "@/components/Navbar/page";

import { createReactEditorJS } from "react-editor-js";
import CheckList from "@editorjs/checklist";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const ReactEditorJS = createReactEditorJS();

interface Note {
  _id: string;
  title: string;
  content: {};
  color: string;
}

const convertBlocksToText = (blocks) => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          const linkMatch = block.data.text.match(/<a[^>]*href="([^"]*)"/);
          return linkMatch ? linkMatch[1] : block.data.text;
        case "header":
          return block.data.text;
        case "list":
          return block.data.items.join("\n");
        case "checkList":
          return block.data.items[0].text + "...";
        default:
          return "";
      }
    })
    .join("\n");
};

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [noteColor, setColor] = useState({});
  const router = useRouter(); // NAVIGATION TO DIFFERENT PAGES
  const pathname = usePathname(); // GET CURRENT URL

  const handleCreateNote = async (
    title: string,
    content: string,
    color: string
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post<Note>(
        "http://localhost:5001/notes",
        { title, content, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // EDIT NOTE
  const editNote = async (noteId: string, content: string) => {
    setEditingNote(noteId);
    setOriginalContent(content);
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

  // SET EXPANDED NOTE BASED ON URL
  const setExpandedFromLink = () => {
    if (!pathname) {
      return;
    }
    const noteId = pathname.split("/").pop();
    if (noteId !== "note-list") {
      setExpandedNote(noteId);
    } else {
      setExpandedNote(null);
    }
  };

  // WHEN NOTES CHANGES AND CALLS setExpandedFromLink TO UPDATE EXPANDED NOTE
  useEffect(() => {
    setExpandedFromLink();
  }, [notes]);

  // COPY NOTE URL
  const copyURL = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage("Länk kopierad till urklipp");
      setShowToast(true);
    });
  };

  // GET ALL NOTES
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

  // CALLS TO GET ALL NOTES FROM SERVER
  useEffect(() => {
    fetchNotes();
  }, []);

  // EXPAND NOTE
  const expandNote = (noteId: string) => {
    if (expandedNote === noteId) {
      router.push(`/note-list/`);
    } else {
      router.push(`/note-list/${noteId}`);
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

  // CHANGE COLOR
  const changeColor = async (noteId: string, newColor?: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/notes/${noteId}`,
        { color: newColor },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setColor((prevColors) => ({
        ...prevColors,
        [noteId]: newColor,
      }));
    } catch (error) {
      console.error("Error changing color:", error);
    }
  };

  // CLOSE EDITING OF NOTE AND KEEP ORIGINAL
  const handleClose = () => {
    setEditingNote(null);
    setEditedContent(originalContent);
  };

  const editorRefs = React.useRef({});

  const [, setEditorInstances] = useState({});

  const handleInitialize = React.useCallback((instance, id) => {
    editorRefs.current[id] = instance;
    setEditorInstances({ ...editorRefs.current });
  }, []);

  return (
    <>
      <Navbar />
      <CreateNote handleCreateNote={handleCreateNote} />

      <div className={styles.allNotes}>
        <h2 className={poppins.className}>Alla anteckningar</h2>
        {loading}
        {error && <p>{error}</p>}

        <div className={styles.noteList}>
          {notes.map((note) => (
            <div
              key={note._id}
              className={`${styles.note} ${
                expandedNote === note._id && styles.expand
              }`}
              style={{ backgroundColor: noteColor[note._id] || note.color }}
            >
              <div className={styles.actions}>
                {expandedNote === note._id && (
                  <div>
                    <EditBar noteId={note._id} onColorChange={changeColor} />
                  </div>
                )}
                <div>
                  {expandedNote === note._id && (
                    <>
                      <Trash
                        className={styles.icons}
                        onClick={() => deleteNote(note._id)}
                        title="Radera"
                      />
                      {showToast && (
                        <Toast
                          message={toastMessage}
                          onClose={() => setShowToast(false)}
                        />
                      )}

                      <Share
                        onClick={() => {
                          const noteUrl = `${window.location.origin}/note-list/${note._id}`;
                          copyURL(noteUrl);
                        }}
                        className={styles.icons}
                        title="Kopiera URL"
                      />
                    </>
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

              <>
                {expandedNote === note._id ? (
                  <>
                    {editingNote === note._id ? (
                      <div>
                        <div
                          contentEditable="false"
                          suppressContentEditableWarning={true}
                          className={styles.editText}
                          onBlur={(e) => setEditedContent(e.target.textContent)}
                        >
                          <ReactEditorJS
                            onInitialize={(instance) =>
                              handleInitialize(instance, note._id)
                            }
                            defaultValue={{ blocks: note.content as any }}
                            tools={{
                              checkList: CheckList,
                              list: List,
                              table: Table,
                            }}
                          />
                        </div>
                        <>
                          <Save
                            onClick={async () => {
                              const savedData = await editorRefs.current[
                                note._id
                              ].save();
                              console.log("savedData");
                              console.log(savedData);
                              const blocks = savedData["blocks"];
                              saveEditedNote(note._id, blocks);
                            }}
                            title="Spara ändringar"
                            className={styles.icons}
                          />
                          <Close
                            onClick={handleClose}
                            title="Ångra ändringar"
                            className={styles.icons}
                          />
                        </>
                      </div>
                    ) : (
                      <>
                        <div
                          onClick={() =>
                            editNote(note._id, note.content as any)
                          }
                        >
                          <ReactEditorJS
                            defaultValue={{ blocks: note.content as any }}
                            readOnly
                            tools={{
                              checkList: CheckList,
                              list: List,
                              table: Table,
                            }}
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  expandedNote === null && (
                    <p>{convertBlocksToText(note.content)}</p>
                  )
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoteList;
