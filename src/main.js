import App from "./server/App";
import HttpServer from "./server/HttpServer";
import BasicRouter from "./router/BasicRouter";

import "./lib/Mongoose";
import Contact from "./model/Contact";
import ContactDao from "./dao/ContactDao";
import ContactService from "./service/ContactService";
import ContactController from "./controller/ContactController";
import ContactRouter from "./router/ContactRouter";

const contactDao = new ContactDao({Contact});
const contactService = new ContactService({contactDao});
const contactController = new ContactController({contactService});
const contactRouter = new ContactRouter({contactController});

const basicRouter = new BasicRouter({contactRouter});

const app = new App({basicRouter});
const httpServer = new HttpServer(app);

httpServer.start();