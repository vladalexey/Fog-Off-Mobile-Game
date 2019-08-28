"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')
const  sqlite3  =  require('sqlite3').verbose();
const sql = require('mysql');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();
app.use(cors());

router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./fogoff.db");

const  createUsersTable  = () => {

    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text UNIQUE NOT NULL,
        email text UNIQUE NOT NULL,
        password text NOT NULL)`;

    return  database.run(sqlQuery);
}

const  findUserByEmail  = (email, cb) => {
    console.log("Find Email " + email)
    return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}

const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (username, password, email) VALUES (?,?,?)', user, (err) => {
        cb(err)
    });
}

const  updateAva  = (newAva, cb) => {
    return  database.run('UPDATE users SET character = (?) WHERE email = (?)', newAva, (err) => {
        cb(err)
    });
}

const  updateUsername  = (newUsername, cb) => {
    return  database.run('UPDATE users SET username = (?) WHERE email = (?)', newUsername, (err) => {
        cb(err)
    });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.post('/register', (req, res) => {

    const  name  =  req.body.username;
    const  email  =  req.body.email;
    const  password  =  bcrypt.hashSync(req.body.password);

    console.log("Router Register: " + name + " " + email + " " + password);

    createUser([name, password, email], (err) => {

        if (err) return res.status(500).send("Server error in create user! " + err);

        findUserByEmail(email, (err, user)=> {
4
            if (err) return  res.status(500).send('Server error in find user register!');  

            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });

            res.status(200).send({ 
                "user":  user, 
                "access_token":  accessToken, 
                "expires_in":  expiresIn });
        });
    });
});


router.post('/login', (req, res) => {

    const  email  =  req.body.email;
    const  password  =  req.body.password;

    console.log("[ROUTER POST] Login " + email + " " + password);

    findUserByEmail(email, (err, user) => {

        if (err) return  res.status(500).send('Server error in find user login!');
        if (!user) return  res.status(404).send('User not found!');
        
        console.log("[ROUTER POST] Login password " + user.password + " " + password )

        const  result  =  bcrypt.compareSync(password, user.password);
        if (!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });

        res.status(200).send({ 
            "user":  user, 
            "access_token":  accessToken, 
            "expires_in":  expiresIn });
    });
});

router.post('/updateAva', (req, res) => {

    console.log("Update Ava " + req.body);

    const  email  =  req.body.email;
    const  character  =  req.body.character;

    console.log("[ROUTER POST] Update " + email + " " + character);

    findUserByEmail(email, (err, user) => {

        if (err) return  res.status(500).send('Server error in find user update ava!');
        if (!user) return  res.status(404).send('User not found!');
        
        console.log("[ROUTER POST] Ava update info " + character)

        updateAva([character, email], (err) => {

            if (err) return res.status(500).send("Server error in update ava! " + err);

            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });

            res.status(200).send({ 
                "user":  user, 
                "access_token":  accessToken, 
                "expires_in":  expiresIn 
            });
        })
        
    });
});

router.post('/updateUsername', (req, res) => {

    console.log("Update Username " + req.body);

    const  email  =  req.body.email;
    const  username  =  req.body.username;

    console.log("[ROUTER POST] Update " + email + " " + username);

    findUserByEmail(email, (err, user) => {

        if (err) return  res.status(500).send('Server error in find user update username!');
        if (!user) return  res.status(404).send('User not found!');
        
        console.log("[ROUTER POST] User update info " + username)

        updateUsername([username, email], (err) => {

            if (err) return res.status(500).send("Server error in update username! " + err);

            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });

            res.status(200).send({ 
                "user":  user, 
                "access_token":  accessToken, 
                "expires_in":  expiresIn 
            });
        })
        
    });
});

app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
});