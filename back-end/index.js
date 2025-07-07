const express = require("express");
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Menu = require('./db/menu');

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async(req, resp)=>{
    let user = new User(req.body)
    let result = user.save();
   
    resp.send(result);
});

app.post('/login', async (req, resp) => {

    if (req.body.username && req.body.password) {
        let user = await User.findOne(req.body).select("-password");   
        if(user){
            resp.send(user)
        }else {
            resp.send({ result: "No user found" })
        }  
    }
    else {
            resp.send({ result: "No user found" })
        }  
});

app.post('/addmenu', async (req, resp) => {
    let menu = new Menu(req.body);
    let result = await menu.save();
    resp.send(result);
});

app.get('/menu', async (req, resp) => {
    let menu = await Menu.find();
    if (menu.length > 0) {
        resp.send(menu)
    } else {
        resp.send({ result: "No product found" })
    }
});

app.delete('/menu/:id', async (req, resp) => {
    const result = await Menu.deleteOne({ _id: req.params.id })
    resp.send(result);
});

app.get('/menu/:id', async (req, resp) => {
    try {
        const result = await Menu.findById(req.params.id);
        if (result) {
            resp.send(result);
        } else {
            resp.send({ error: 'Menu item not found' });
        }
    } catch (error) {
        resp.send({ error: 'Invalid ID format' });
    }
});


app.get("/search/:key", async (req, resp) => {
    let result = await Menu.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    resp.send(result);
});

app.put('/menu/:id', async (req, resp) => {
    let result = await Menu.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});

app.listen(4000);