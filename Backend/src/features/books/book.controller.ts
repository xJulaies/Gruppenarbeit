import { RequestHandler } from "express";
import { createAnswer } from "../../lib/errorhandling/createAnswer";
import { createError } from "../../lib/errorhandling/createError";
import { book } from "./book.model";

export const GET_allBooks: RequestHandler = async (_req, res, next) => {
  try {
    const books = await book.find();

    res.status(200).json(createAnswer(200, "success", books));
  } catch (error) {
    next(createError(500, "Cant find book data"));
  }
};

export const GET_bookById: RequestHandler = async (req, res, next) => {};

export const POST_newBook: RequestHandler = async (req, res, next) => {};

export const PUT_bookStatus: RequestHandler = async (req, res, next) => {};

export const DELETE_book: RequestHandler = async (req, res, next) => {};
