import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import productsRoutes from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRoute.js";
import colorRouter from "../routes/colorRoute.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/ordersRouter.js";
import Order from "../model/Order.js";

dotenv.config();
//db connect
dbConnect();
const app = express();
//cors
app.use(cors());
//Stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_675f6c301905ccbd158e1fba851bf9a894aa146a1e3c833d2ef84f7f9c4a6415";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      // console.log("event");
    } catch (err) {
      // console.log("err", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === "checkout.session.completed") {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        {
          new: true,
        }
      );
      console.log(order);
    } else {
      return;
    }
    // // Handle the event
    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     const paymentIntent = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({ extended: true }));

//server static files
app.use(express.static("public"));
//routes
//Home route
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRoutes);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/colors/", colorRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders/", orderRouter);
//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
