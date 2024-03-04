const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose");



app.use('/', express.static('public'));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const budgetSchema = require("./my_budget_models/budget_schema");
let url = 'mongodb://localhost:27017/my_budgetDB';


app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 })

        .then(() => {
           
            budgetSchema.find({})
                .then((data) => {
                    console.log("data displayed");
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
})



app.post('/addMyBudget', async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Connected to the database to insert data");
        console.log(req.body);

        const newData = new budgetSchema(req.body);
        console.log(newData);

        await newData.save();

        res.status(201).send("Data Inserted into database Successfully");
    } catch (error) {
        console.log("Error adding data:", error);
        res.status(500).send(error.message);
    } finally {
        mongoose.connection.close();
    }
});


app.listen( port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
} )