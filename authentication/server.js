const express = require("express");
const path = require("path");
const connectToDB = require("./src/config/db");
const userRoute = require("./src/route/userRoute");
const todoRoute = require("./src/route/todoRouter");
const auth = require("./src/middleware/auth");
const limiter = require("./src/middleware/rateLimit");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const url = process.env.DB_URL;

app.use(express.json());
app.use(express.static("public"));
app.use(limiter);
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

app.use("/todo", auth, todoRoute);

app.use("/user", userRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8080, async () => {
  await connectToDB(url);
  console.log('connected to Mongoose database...')
  console.log(`server is running on http://localhost:8080`);
});
