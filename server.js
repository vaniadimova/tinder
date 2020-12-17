import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Cards from './dbCards.js'
//App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://vania:SpiderNet2020@cluster0.oehb9.mongodb.net/vania?retryWrites=true&w=majority'

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API endpoint

app.get('/', (req, res) => res.status(200).send('HAPPY TO SEE YOU!'));

app.post('/tinder/card', (req, res) => {
    const dbCard =req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)}
    });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)}
    });
});
app.post("/tinder/cards", (req, res) => {
    // save request body into a var
    const dbCard = req.body;
    //   function to create a new document
    Cards.create(dbCard, (err, data) => {
      // if there is error
      if (err) {
        // set response to 500, which means internal server error and send error back
        res.status(500).send(err);
      } else {
        // 201 means created, successfully created our data and send back the data
        res.status(201).send(data);
      }
    });
  });



//There is a REST-client extention for VC that can check http || use postman

//Listener
app.listen(port, () => console.log(`listenning on localhost: ${port}`));