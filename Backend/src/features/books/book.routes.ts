import { Router } from "express";
import {
  GET_allBooks,
  GET_bookById,
  POST_newBook,
  PUT_rentBook,
  PUT_returnBook,
} from "./book.controller";
import { requireUser } from "../../middlewares/clerk";
import {
  validatorBody,
  validatorHeaders,
  validatorParams,
  validatorQuery,
} from "../../middlewares/validate";
import { createBookSchema } from "./books.zodSchema";

export const bookRouter = Router();

//public

bookRouter.get("/", GET_allBooks);
bookRouter.get("/:id/", GET_bookById);

//protected

bookRouter.post(
  "/",
  requireUser,
  validatorBody(createBookSchema),
  POST_newBook,
);

bookRouter.put("/:id", requireUser, validatorParams(), PUT_rentBook);

bookRouter.put("/:id", requireUser, validatorParams(), PUT_returnBook);
