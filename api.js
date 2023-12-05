import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "Seychelles: Paradise Found",
    content:
      "Escape to Seychelles, a tropical heaven of 115 islands with pristine beaches and crystal-clear waters. Dive into vibrant coral reefs, wander through the Valle de Mai Nature Reserve, and savor the unique Creole cuisine.From the lively markets of Mahe to the secluded coves of La Digue, Seychelles offers diverse experiences. Luxuriate in beachfront resorts, where the gentle waves create a soothing backdrop.Whether you crave adventure or tranquility, Seychelles delivers with its untouched beauty. Indulge in the magic of this Indian Ocean paradise, where every moment is a snapshot of pure bliss.",
    author: "Alex Thompson",
    date: "2023-12-04T10:24:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-12-04T10:29:00Z",
  },
  {
    id: 3,
    title: "Yoga Bliss: Mind, Body, Soul in Harmony",
    content:
      "Embark on a journey of serenity with yoga—a holistic blend of gentle stretches, controlled breath, and mindfulness. From empowering poses to soothing meditation, yoga unveils a sanctuary for balance and self-discovery. In moments, find tranquility, flexibility, and strength on the mat, embracing the blissful union of mind, body, and soul.",
    author: "Seane Corn",
    date: "2023-12-04T10:35:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) return res.status(404).json({ message: "Post not found" });
  res.json(foundPost);
});


app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),

  };
  posts.push(newPost);
  // console.log(posts.slice(-1));
  res.json(newPost);
});


app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;  
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});


app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at PORT: ${port}`);
});
