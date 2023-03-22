const express = require("express");
const userRoutes = require("./routes/user.routes");
const aboutRoutes = require("./routes/about.routes.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser } = require("./middleware/auth.middleware");
const { requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) =>
  res.status(200).send(res.locals.user._id)
);

//routes
app.use("/api/user", userRoutes);
app.use("/about.json", aboutRoutes);

// Server at the end of the file
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
