import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/Todo";
import Logger from "../library/Logger";

export const Validate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logger.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  todo: {
    create: Joi.object<Todo>({
      text: Joi.string().required(),
      completed: Joi.boolean().required(),
    }),
    update: Joi.object<Todo>({
      text: Joi.string().required(),
      completed: Joi.boolean().required(),
    }),
  },
};
