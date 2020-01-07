require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post('/login', (req, res) => {
  //Authenticate User

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
  // let asd = jwt.decode(refreshToken)    this is only for decoding if you want for some reason
  console.log(asd)
});

function generateAccessToken(user) {
  return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25s' });
};

app.listen(4000);