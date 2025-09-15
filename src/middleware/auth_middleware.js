const db = require("../Db/db");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { data, error } = await db.auth.getUser(token);
    if (error) return res.status(401).json({ message: error.message });

    req.user = data.user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { authenticate };
