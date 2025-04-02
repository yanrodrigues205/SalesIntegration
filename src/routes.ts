import { Router } from "express";
import AuthMiddeware from "./middleware/AuthMiddleware";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionController";
export const routes = Router();
const usersController = new UsersController();
const sessionController = new SessionsController();

routes.get("/", (req, res) => {
    res.status(244).json({
        message: "bem vindo!"
    })
});

routes.post("/verify", (req, res) =>{
    sessionController.verifySession(req, res);
});

routes.post("/signup", (req, res) =>{   usersController.createUser(req, res)    });

routes.post("/second-factor", (req, res) =>{   sessionController.secondFactor(req, res)   });


routes.post("/first-factor", (req, res) =>{   sessionController.firstFactor(req, res)   });