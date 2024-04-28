import User from "../../../models/user"
const bcrypt = require("bcryptjs");
const db = require("../../../db");


export async function POST (req, res) {
  db.connect();
    try {
   
      const {username,password} = await req.json()
  
      let user = await User.findOne({ username });
      if (user) {
        return new Response('Användarnamnet är redan taget', {
          status: 400,
        })
      }
  
      user = new User({
        username,
        password,
      });
  
      await user.save();
  
      return new Response('Hello, Next.js!', {
        status: 200,
      })

    } catch (error) {
      console.error(error);
      return new Response('Något gick fel', {
        status: 500,
      })
    }
  };