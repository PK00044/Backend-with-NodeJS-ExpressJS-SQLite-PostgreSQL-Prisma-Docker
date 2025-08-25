import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const authRoute = express.Router();

authRoute.post('/register', (req, res)=>{
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword);

        // Default Todo to be appeared
        const defaultTodo = `Hello :) first Todo`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        // Create Token
        const token = jwt.sign({
            id: result.lastInsertRowid},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({token})

    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    }
})

authRoute.post('/login', (req, res)=>{
    const {username, password} = req.body;

    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username);

        if(!user) return res.status(404).json({message: 'User not found'})

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid) return res.status(401).json({message: 'Invalid Password'})

        // Create Token
        const token = jwt.sign({
            id: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({token})

    } catch (error) {
        console.log(error);
        res.sendStatus(404);
        
    }
})

export default authRoute;
