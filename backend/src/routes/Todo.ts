import express from "express";
import controller from "../controllers/Todo";
import { Schemas, Validate } from "../middleware/joi";

const router = express.Router();

router.post("/create", Validate(Schemas.todo.create), controller.createTodo);
router.get("/get/:todoId", controller.getTodo);
router.get("/get", controller.getAll);
router.patch(
  "/update/:todoId",
  Validate(Schemas.todo.update),
  controller.updateTodo
);
router.delete("/delete/:todoId", controller.deleteTodo);

export = router;
