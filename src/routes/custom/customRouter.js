import { Router } from "express";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    };

    getRouter() {
        return this.router;
    };
    init() { }; //Esta inicialilzacion se usa para las clases heredadas.

    get(path, policies, ...callbacks) {
        console.log("Entrando por GET a custom router con Path: " + path);
        console.log(policies);
        this.router.get(path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };


    post(path,  ...callbacks) {
        this.router.post(path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };

    put(path, ...callbacks) {
        this.router.put(path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };

    delete(path,  ...callbacks) {
        this.router.delete(path,

            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };




    // función que procese todas las funciones internas del router (middlewares y el callback principal)
    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.error(error);
                params[1].status(500).send(error);
            }
        });
    }


    generateCustomResponses = (req, res, next) => {
        //Custom responses 
        res.sendSuccess = product => res.status(200).send({ status: "Success", product });
        res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
        res.sendClientError = error => res.status(400).send({ status: "Client Error, Bad request from client.", error });
        res.sendUnauthorizedError = error => res.status(401).send({ error: "User not authenticated or missing token." });
        res.sendForbiddenError = error => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });
        next();
    };




};

