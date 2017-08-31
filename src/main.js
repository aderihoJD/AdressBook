import App from "./server/App";
import HttpServer from "./server/HttpServer";
import BasicRouter from "./router/BasicRouter";

import "./lib/Mongoose";
import Contact from "./model/Contact";
import ContactDao from "./dao/ContactDao";
import ControlDao from './dao/ControlDao';
import ContactService from "./service/ContactService";
import ControlService from "./service/ControlService";
import ContactController from "./controller/ContactController";
import ControlController from "./controller/ControlController";
import ContactRouter from "./router/ContactRouter";
import ControlRouter from "./router/ControlRouter";

const contactDao = new ContactDao({Contact});
const controlDao = new ControlDao({Contact});
const contactService = new ContactService({contactDao});
const controlService = new ControlService({controlDao});
const contactController = new ContactController({contactService});
const controlController = new ControlController({controlService});
const contactRouter = new ContactRouter({contactController});
const controlRouter = new ControlRouter({controlController});
const basicRouter = new BasicRouter({contactRouter, controlRouter});

const app = new App({basicRouter});
const httpServer = new HttpServer(app);

httpServer.start();