const express = require('express');

const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt.js')
const person = require('./../models/person');

router.post('/signup', async (req, res) => {

    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log("employee data is saved");

        const payLoad = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payLoad);
        console.log("Token is :", token)
        res.status(200).json({ Response: response, Token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/profile' ,jwtAuthMiddleware, async (req,res) =>{
    try {
       
        console.log("req.user:", req.user); // Log req.user to debug
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User ID is missing' });
        }

        const userId = req.user.id;
        const user = await person.findById(userId);
    
    res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await person.findOne({ username: username })

        if (!user || !(await user.comparepassword(password))) {
            res.status(401).json({ erro: "invalid username  or password" })
        }

        const payLoad = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payLoad);
        res.json({"Token is" : token})
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const response = await person.find();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await person.find({ work: workType });
            console.log("employee data is feteched");
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const p_ID = req.params.id
        const updatedData = req.body
        const response = await person.findByIdAndUpdate(p_ID, updatedData, {
            new: true,
            runValidators: true

        })
        if (!response) {
            res.status(404).json({ error: "employee not found" })
        } else {
            console.log("employee data updated");
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const p_ID = req.params.id
        const respnose = await person.findByIdAndDelete(p_ID)
        res.status(200).json({ message: "data deleted" })

        if (!respnose) {
            res.status(404).json({ error: "employee not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router