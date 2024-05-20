import expres from "express";
import { signin, signup } from "../controllers/user.js";
const route = expres.Router();

route.post("/", signin);
route.post("/", signup);

export default route;
