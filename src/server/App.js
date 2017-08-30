import express from "express";
import bodyParser from "body-parser";

import logger from "../middleware/logger";
import errorHandler from "../middleware/errorHandler";
import validator from "../middleware/validator";

function App({basicRouter}){
    const app = express();
    app.use(logger());
    app.use(bodyParser.json());
    app.use(validator());
    app.use('/api',basicRouter);
    app.use(errorHandler());
    return app;
}

export default App;