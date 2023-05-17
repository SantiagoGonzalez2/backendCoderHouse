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

    get(path, ...callbacks) {
        console.log("Entrando por GET a custom router con Path: " + path);
        this.router.get(path,
            this.applyCallbacks(callbacks));
    };


    post(path,  ...callbacks) {
        this.router.post(path,
            this.applyCallbacks(callbacks));
    };

    put(path, ...callbacks) {
        this.router.put(path,
            this.applyCallbacks(callbacks));
    };

    delete(path,  ...callbacks) {
        this.router.delete(path,
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


};

