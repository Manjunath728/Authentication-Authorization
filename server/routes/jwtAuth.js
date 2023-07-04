require('dotenv').config();

const router = require("express").Router()
const bcrypt=require("bcrypt")
const jwtGenerate=require("../utils/jwtGenerate")
const validInfo =require('../middleware/validInfo');
const authorization= require("../middleware/authorization")
  const pool = require("../db");
  // regestering
router.post("/register",validInfo,async (req,res)=>{
    try {
        // 1) destructure req.body 
        const {name,email,password}=req.body;

        // 2) check user exists    throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
        if(user.rows.length !==0){
            return res.status(401).send("user already exits");
        }

       
        // 3) bcrypt password 
        const saltRound=10;
        const salt= await bcrypt.genSalt(saltRound);
        console.log(salt)
        const bcryptPassword= await bcrypt.hash(password,salt);
        // 4) insert to database
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",[name,email,bcryptPassword])
        // 5)generate jwt token
        const token=jwtGenerate(newUser.rows[0].user_id);
        res.json({token});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error")
    }
})

// login route

router.post('/login',validInfo,async (req,res)=>{
    try {
        
        //1) destructure
         const  {email,password}=req.body;
        //2) check user exixte or not
        const user = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
        if(user.rows.length === 0){
            return res.status(401).json("password or email incorect");
        }
        //3) check password valid or not 
        const validPassword= await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json("password or email incorect");
        }

        //4) given jwt token 
        const token=jwtGenerate(user.rows[0].user_id);
        res.json({token});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error")
    }
})

router.get('/isverify',authorization,async (req,res)=>{
    try {
        res.json(true);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error")
    }
})
module.exports=router;