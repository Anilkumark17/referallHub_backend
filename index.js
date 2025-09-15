const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth_route");

const app = express();
const PORT = 5000;


app.use(cors());

app.use(express.json()); 

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
