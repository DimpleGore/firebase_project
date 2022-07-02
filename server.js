const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')
const admin = require('firebase-admin');
var serviceAccount = require('./admin.json');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user',require('./Routes/routes'));
   
if(process.env.NODE_ENV == 'production'){

    const path = require('path');
    app.get('/',(req,res) => {
        app.use(express.static(path.resolve(__dirname,'client','build')))
        app.sendFile((path.resolve(__dirname,'client','build','index.html')))
    })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (error) => {
    if (error) return new Error(error);
    console.log(`server is listening on port ${PORT}`);
});

app.get("/home", (req, res) => {
    console.log("come")
    res.send("success");
})


