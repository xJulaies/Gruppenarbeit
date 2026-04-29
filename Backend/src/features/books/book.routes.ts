import { Router } from "express";
import { GET_allBooks } from "./book.controller";

export const bookRouter = Router();

//public

bookRouter.get("/", GET_allBooks);
