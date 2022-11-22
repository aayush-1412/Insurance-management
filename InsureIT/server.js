const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.wqmo2td.mongodb.net/ourcustomer")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const demoSchema = {
  fullname: String,
  email: String,
  address: String,
  city: String,
  insurance: String,
  state: String,
  zipcode: Number,
  nameOnCard: String,
  ccNumber: String,
  expYear: Number,
  cvv: Number,
  nomineeName: String,
  nomineeNumber: String,
};
const MyCustomer = mongoose.model("MyCustomer", demoSchema);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.post("/paymentform.html", (req, res) => {
  let newCustomer = new MyCustomer({
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    insurance: req.body.insurance,
    state: req.body.state,
    zipcode: req.body.zipcode,
    nameOnCard: req.body.nameOnCard,
    ccNumber: req.body.ccNumber,
    expYear: req.body.expYear,
    cvv: req.body.cvv,
    nomineeName: req.body.nomineeName,
    nomineeNumber: req.body.nomineeNumber,
  });
  newCustomer.save();
  res.redirect("/dashboard.html");
  console.log(newCustomer);
});

app.get("/dashboard.html", (req, res) => {
  MyCustomer.find({}, function (err, mycustomers) {
    res.render("index", {
      customerList: mycustomers,
    });
  });
});

app.listen(8080, () => {
  console.log("Server is running");
});
