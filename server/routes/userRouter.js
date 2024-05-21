import expres from "express";
import { signin, signup } from "../controllers/user.js";
const route = expres.Router();

route.post("/signin", signin);
route.post("/signup", signup);

export default route;
