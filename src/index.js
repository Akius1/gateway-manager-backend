import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./api/routes/route";
import cors from "cors";

dotenv.config();
const mongoString = process.env.DATABASE_URL;
if (process.env.NODE_ENV !== "test") {
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
}
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
    app.listen(8000, () => {
        console.log(`Server Started at ${8000}`);
      });
  }

  export default app;


