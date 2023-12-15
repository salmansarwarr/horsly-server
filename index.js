import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nftRoutes from "./routes/nfts.js";
import downloadRoutes from "./routes/downloads.js";
import favouritesRoutes from "./routes/favourites.js";
import viewsRoutes from "./routes/views.js";
import { connectDB } from "./utils/mongodb.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
app.use(cors());

app.use("/nfts", nftRoutes);
app.use("/downloads", downloadRoutes);
app.use("views", viewsRoutes);
app.use("favourites", favouritesRoutes);

app.get("/", (req, res) => res.send("App is running"));

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "NFTS Express API with Swagger",
            version: "0.1.0",
            description: "Apis for Horsly Project",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
            {
                url: "https://horsly-server.vercel.app/"
            }
        ],
    },
    apis: ["./routes/*.js"], 
};

const specs = swaggerJSDoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || "3000"}`);
    });
});
