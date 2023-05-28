// import express from "express";

// const app = express();
// const port = 3000; //add your port here
// const PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
// const SECRET_KEY = "";
// import Stripe from "stripe";
// const IP_ADDRESS = '192.168.1.4'

// //Confirm the API version from your stripe dashboard
// const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

// app.listen(port,IP_ADDRESS, () => {
//   console.log(`Example app listening at http://localhost:${port} or http://${IP_ADDRESS}:${port}`);
// });

// app.get('/', async(req,res)=>{
//   res.status(200).send({
//       message:"Hello from LuciX",
//   })
// })


// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     // let {amount } = req.body;
//     // amount = parseInt(amount);
//     // console.log("Amount is",amount);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 200, //lowest denomination of particular currency
//       currency: "INR",
//       payment_method_types: ["card"], //by default
      
//     });

//     const clientSecret = paymentIntent.client_secret;

//     res.json({
//       clientSecret: clientSecret,
//     });
//   } catch (e) {
//     console.log(e.message);
//     res.json({ error: e.message });
//   }
// });



// require("dotenv").config();
// const express = require("express");
// const nodemailer = require('nodemailer');
// const app = express();
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const cors = require("cors");
// const PORT = process.env.PORT || 5000;
// const IP_ADDRESS = '192.168.1.4'

// app.use(express.json());
// app.use(cors());


// app.post("/create-payment", async (req, res) => {
//   try {
//     // Getting data from client
//     let { amount, name } = req.body;
//     // Simple validation
//     if (!amount || !name)
//       return res.status(400).json({ message: "All fields are required" });
//     amount = parseInt(amount);
//     // Initiate payment
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "INR",
//       payment_method_types: ["card"],
//       metadata: { name },
//     });
//     // Extracting the client secret 
//     const clientSecret = paymentIntent.client_secret;
//     // Sending the client secret as response
//     res.json({ message: "Payment initiated", clientSecret });
//   } catch (err) {
//     // Catch any error and send error 500 to client
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.use("/stripe", express.raw({ type: "*/*" }));

// app.post("/stripe", async (req, res) => {
//   // Get the signature from the headers
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     // Check if the event is sent from Stripe or a third party
//     // And parse the event
//     event = await stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     // Handle what happens if the event is not from Stripe
//     console.log(err);
//     return res.status(400).json({ message: err.message });
//   }
//   // Event when a payment is initiated
//   if (event.type === "payment_intent.created") {
//     console.log(`${event.data.object.metadata.name} initated payment!`);
//   }
//   // Event when a payment is succeeded
//   if (event.type === "payment_intent.succeeded") {
//     console.log(`${event.data.object.metadata.name} succeeded payment!`);
//     // fulfilment
//   }
//   res.json({ ok: true });
// });


// app.post('/sendmail', async (req, res) => {
//   try {
//     const { email } = req.body;

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: 'bill99@ethereal.email', // replace with your Ethereal email username
//         pass: 'ZT2DGWGeuWfWZTNsDE', // replace with your Ethereal email password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: 'cscssingh123@gmail.com', // sender address
//       to: email, // recipient address
//       subject: 'Hello ✔', // Subject line
//       text: 'Hello world?', // plain text body
//       html: '<b>Hello world?</b>', // html body
//     });

//     console.log('Message sent: %s', info.messageId);

//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email: ', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// app.listen(PORT,IP_ADDRESS, () => console.log(`Server running on port ${PORT} and http://${IP_ADDRESS}:${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 5000;
const IP_ADDRESS = '192.168.1.4'

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

app.post("/pay", async (req, res) => {
  try {
    const { name, totalPayment } = req.body;

    amount = parseInt(totalPayment);
    if (!name) return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Use the 'amount' variable
      currency: "INR",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

app.listen(PORT,IP_ADDRESS, () => console.log(`Server running on port ${PORT} and http://${IP_ADDRESS}:${PORT}`));