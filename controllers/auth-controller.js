const { read_file, write_file } = require("../fs/fs-api");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersFile = "users.json";

const Auth = {
  REGISTER: async (req, res) => {
    const { email, password, username } = req.body;
    const allUsers = read_file(usersFile);
    const checkUser = allUsers.find((user) => user.email === email);
    const hashPassword = await bcrypt.hash(password, 12);

    if (checkUser) {
      return res.status(401).send({ message: "This email already exists!" });
    }

    allUsers.push({
      id: allUsers[allUsers.length - 1]
        ? allUsers[allUsers.length - 1].id + 1
        : 1,
      username,
      password: hashPassword,
      email,
    });

    write_file(usersFile, allUsers);
    res.status(200).send({ message: "Successfully Authenticated" });
  },

  LOGIN: async (req, res) => {
    const { email, password } = req.body;
    const checkUser = read_file(usersFile).find((user) => user.email === email);
    if (!checkUser) {
      return res.status(404).send({ message: "User not found!" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword)
      return res.status(401).send({ message: "Invalid Password!" });

    const token = jwt.sign(
      { id: checkUser.id, email: checkUser.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_TIME }
    );

    res.status(200).send({ token: token });
  },
};

module.exports = Auth;
