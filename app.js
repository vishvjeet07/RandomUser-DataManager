const express = require('express');
const app = express();
const userModel = require('./models/user');
const axios = require('axios');
const user = require('./models/user');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
// app.get('/',async function(req,res){
//     const response = await axios.get('https://randomuser.me/api/');
//     const firstResult = response.data;

// })

app.get('/create',async function(req,res){
    const response = await axios.get('https://randomuser.me/api/');
    const firstResult = response.data;
    username = firstResult.results[0].name.first;
    email = firstResult.results[0].email;
    age = firstResult.results[0].dob.age;
    city = firstResult.results[0].location.city;
    imgUrl = firstResult.results[0].picture.large;

    //console.log(username,email,age,city,imgUrl);

    let createdUser = await userModel.create({
        name:username,
        email:email,
        age:age,
        city:city,
        imgUrl:imgUrl
    });
    const fetchData = async() =>{
        const currentUser = await userModel.find();
        newUser = currentUser[currentUser.length - 1];
        res.render("profile",{imgUrl:newUser.imgUrl,name:newUser.name,age:newUser.age,city:newUser.city,email:newUser.email});
    }
    fetchData();
})

app.listen(3000);