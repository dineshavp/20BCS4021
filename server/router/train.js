import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", (req, res) => {
  const clientID = uuidv4();
  const clientSecret = uuidv4();
  const data = {
    companyName: req.body.companyName,
    clientID: clientID,
    clientSecret: clientSecret,
  };
  console.log(data);
  res.json(data);
});

router.post("/auth", (req, res) => {
  const payload = req.body;
  const secretKey = "your-secret-key";
  const expiresIn = 1682629264;
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: 3600 });
  const response = {
    token_type: "Bearer",
    access_token: accessToken,
    expires_in: expiresIn,
  };
  console.log(response);
  res.json(response);
});

export { router as trainRouter };
