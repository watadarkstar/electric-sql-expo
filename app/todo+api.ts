import { addTodo, updateTodo } from "@/db/util";

export function GET(request: Request) {
  return Response.json({ hello: 'world' });
}

export async function POST(request: Request) {
  const body = await request.json();

  const todo = await addTodo(body.text)

  return Response.json({ todo, message: 'Todo added successfully' });
}

export async function PUT(request: Request) {
  const body = await request.json();

  const todo = await updateTodo(body.id, body.done);

  return Response.json({ todo, message: 'Todo updated successfully' });
}