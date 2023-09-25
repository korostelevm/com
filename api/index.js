const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json()); 

app.use(router);

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};
app.use(express.static("public", options));


app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/index.html");
  });

  

app.listen(3000, () => {
    }
);