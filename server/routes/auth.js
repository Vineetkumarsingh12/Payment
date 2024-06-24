import express from "express";
import {
  login,
  logout,
  newUser,
} from "../controllers/user.js";

import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

app.use(isAuthenticated);


app.get("/logout", logout);


export default app;
