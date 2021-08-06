const express = require('express')
const app = express()
const port = 3000

app.route("/contacts/")
    .get((req, res) => {
        if ("offset" in req.query && "limit" in req.query) {
            res.send("Get contacts with pagination, offset=" + req.query["offset"] + ", limit=" + req.query["limit"]);
        } else if ("firstname" in req.query && "lastname" in req.query) {
            res.send("Get contacts from search, firstname=" + req.query["firstname"] + ", lastname=" + req.query["lastname"]);
        } else {
            res.send("Get all contacts");
        }
    })
    .post((req, res) => res.send("Add a new contact"))

app.route("/contacts/:id")
    .get((req, res) => res.send("Get contact, id=" + req.params["id"]))
    .put((req, res) => res.send("Replace contact, id=" + req.params["id"]))
    .patch((req, res) => res.send("Replace contact partially, id=" + req.params["id"]))
    .delete((req, res) => res.send("Delete contact, id=" + req.params["id"]))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable
