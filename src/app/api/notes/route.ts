
// const noteController = require("../controllers/noteController");

// router.post("/note", noteController.createNote);

// router.get("/note", noteController.getAllNotes);

// const Note = require("../../../models/note.js");

// exports.createNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = new Note({ title, content });
//     await note.save();
//     res.status(201).json({ message: "Anteckningen har skapats", note });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Något gick fel" });
//   }
// };

// export async function GET (req, res) {
//   try {
//     const notes = await Note.find();
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Något gick fel" });
//   }
// };


// export async function GET (req, res) {
  
//     //   return new Response('Hello, Next.js!', {
//     //     status: 200,
//     //   })

//     return noteController.get.getAllNotes (req,res)

//     } 
