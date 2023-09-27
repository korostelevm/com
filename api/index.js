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
app.use('/blog', express.static('blog'));




app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/index.html");
  });

  
  const fs = require('fs');
  const path = require('path');



function parseMetadata(str) {
  const start = str.indexOf('---');
  const end = str.indexOf('---', start + 3);
  
  if (start !== -1 && end !== -1) {
    const metadataStr = str.substring(start + 3, end).trim();
    const lines = metadataStr.split('\n');
    const jsonObject = {};
    
    for (const line of lines) {
      const [key, value] = line.split(': ');
      jsonObject[key] = value;
    }
    
    
    return jsonObject;
  }
  
  return null;
}

router.get('/api/posts', async (req, res) => {


  
  
  const dir = path.resolve(__dirname, 'blog');
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md')); 
  const posts = files.map((file) => {
    const filePath = path.resolve(dir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const metadata = parseMetadata(fileContent);
    const body = fileContent.replace(/---(.|\n)*---/, '').trim();
    const slug = file.replace('.md', '');
    return {slug, metadata, body};
  });


  res.json(posts)
})


router.get('/api/posts/:slug', async (req, res) => {
  const {slug} = req.params;
  const filePath = path.resolve(__dirname, 'blog', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const metadata = parseMetadata(fileContent);
  const body = fileContent.replace(/---(.|\n)*---/, '').trim();
  res.json({slug, metadata, body});
}
)


app.listen(3000, () => {
    }
);