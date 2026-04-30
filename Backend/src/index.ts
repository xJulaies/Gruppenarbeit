import express, { json } from "express";
import { clerkMiddleware } from "@clerk/express";
import { settings } from "./config/settings";
import connectDB from "./config/database";
import { bookRouter } from "./features/books/book.routes";


const BASE_URL = settings.BASE_URL;

async function startServer() {
  try {
    await connectDB();
    app.listen(settings.PORT, () => {
      console.log(`Server booted on Port: ${settings.PORT}`);
    });
  } catch (error) {
    console.log("Error Database");
  }
}
const app = express();
app.use(json());
app.use(clerkMiddleware());

app.use("/books", bookRouter);

startServer();
