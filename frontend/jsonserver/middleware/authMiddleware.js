const users = require("../data/users.js");

module.exports = (req, res, next) => {
  if (req.path === "/users/sign_in" && req.method === "POST") {
    const email = req.body?.user?.email;
    const user = users.find((u) => u.email === email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid email!" });
    }
  } else if (req.path === "/users/sign_out" && req.method === "DELETE") {
    res.status(202).json({});
  } else {
    next();
  }
};
