import { HttpResponse, http } from "msw";

const todos = ["postman", "msw"];

export const handlers = [
  http.get("/main", () => {
    return HttpResponse.json(todos);
  }),
];
