import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
  text: string;
  completed: boolean;
}

export interface TodoDocument extends Todo, Document {}

const TodoSchema: Schema = new Schema<TodoDocument>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<TodoDocument>("Todo", TodoSchema);
