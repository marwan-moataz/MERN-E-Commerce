const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");

const ApiError = require("./utils/apiError");
const globalErrorHandling = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

dbConnection();

//Middlewares

app.use(express.json());

if (process.env.NODE_ENV) {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Error handling middleware
app.use(globalErrorHandling);

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log("listening on port 8000");
});
