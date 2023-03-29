import Express from "express";
import Controller from "../controller/author.controller";

const Router = Express.Router();
const BASED_URL = "/api/v1";

/* Author Routing */
Router.post(`${BASED_URL}/author/create`, Controller.save);
Router.get(`${BASED_URL}/author/get`, Controller.findAll);
Router.get(`${BASED_URL}/author/get/:id`, Controller.getById);

export default {
    authorRoutes: Router
};