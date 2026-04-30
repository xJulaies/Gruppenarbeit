import { RequestHandler } from "express";
import { createAnswer } from "../../lib/errorhandling/createAnswer";
import { createError } from "../../lib/errorhandling/createError";
import { book } from "./book.model";
import { ClerkClient, getAuth } from "@clerk/express";

export const GET_allBooks: RequestHandler = async (_req, res, next) => {
  try {
    const books = await book.find();

    res.status(200).json(createAnswer(200, "success", books));
  } catch (error) {
    next(createError(500, "Cant find book data"));
  }
};

export const GET_bookById: RequestHandler = async (req, res, next) => {
  try {
    const found = await book.findById(req.params.id);
    if (!found) {
      return next(createError(404, "Can't find Book"));
    }
    res.status(200).json(createAnswer(200, "Success", [found]));
  } catch (error) {
    next(createError(500, "Can't Find Book"));
  }
};

export const POST_newBook: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const newBook = await book.create({
      ...req.body,
    });

    res
      .status(201)
      .json(createAnswer(201, "New Book is Successfully Posted", [newBook]));
  } catch (error) {
    next(createError(500, "Can't post New Book"));
  }
};

export const PUT_rentBook: RequestHandler = async (req, res, next) => {};

export const PUT_returnBook: RequestHandler = async (req, res, next) => {};

export const DELETE_book: RequestHandler = async (req, res, next) => {};
