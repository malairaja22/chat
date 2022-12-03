const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();
app.use(cors());
const url = process.env.URL;
const port = process.env.PORT;
const Signup = require("./schemas/signup");
const Contacts = require("./schemas/contactlist")
const Chat = require('./schemas/chat')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected")
    }).then(() => {
        app.listen(port)
    }).catch((err) => {
        console.log(err)
    });

app.post('/signup', async (req, res) => {
    try {
        let user = await Signup.findOne({ username: req.body.username });
        if (user === null) {
            const doc = new Signup({ ...req.body });
            await doc.save();
            const doc1 = new Contacts({ username: req.body.username });
            await doc1.save();
            res.send(doc.username);
        } else {
            res.send("Username already exist")
        }

    } catch (err) {
        res.send(err)
    }
})

app.post('/signin', async (req, res) => {
    try {
        let user = await Signup.findOne({ ...req.body });

        if (user === null) {
            res.send("not found")
        } else {
            res.send(user.username)
        }

    } catch (err) {
        res.send(err)
    }
})


app.post('/searchcontact', async (req, res) => {
    try {
        let user = await Signup.findOne({ username: req.body.username });
        if (user === null) {
            res.send("Username Not found");

        } else {
            res.send(user.username)
        }

    } catch (err) {
        res.send(err)
    }
})

app.post('/addcontact', async (req, res) => {
    try {
        if (req.body.currentuser !== req.body.contact) {

            let con = await Contacts.findOne({ username: req.body.currentuser })
            if (con.contacts.find((e) => e === req.body.contact)) {
            } else {
                con.contacts.push(req.body.contact);
                await Contacts.findOneAndUpdate({ username: req.body.currentuser },
                    { contacts: con.contacts },
                    { new: true });

                    res.send("OK")
            }
        } else {
            res.send("username is incorrect")
        }

    } catch (err) {
        res.send(err)
    }

})

app.post('/contactlist', async (req, res) => {
    try {
        let list = await Contacts.findOne({ username: req.body.user })
        res.send(list.contacts)

    } catch (err) {
        res.send(err)
    }
})

app.post('/addmessage', async (req, res) => {
    try {
        let mes = new Chat({ from: req.body.from, to: req.body.to, message: req.body.message, time: req.body.time })
        await mes.save();
        res.send("success")

    } catch (err) {
        res.send(err)
    }
})

app.post('/getmessage', async (req, res) => {
    try {
        let mes = await Chat.find({ from: req.body.from, to: req.body.to })

        let mes1 = await Chat.find({ from: req.body.to, to: req.body.from })
        let arr = [...mes, ...mes1]
        res.send(arr.sort().reverse())

    } catch (err) {
        res.send(err)
    }
})