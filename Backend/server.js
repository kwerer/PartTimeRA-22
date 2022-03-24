import express from "express";
import cors from "cors";
import getPostData from "./index.js";
import { TiktokDataComments, TiktokDataPost } from "./config.js";
import testing from "./test.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sendTiktokDataPost", async (req, res) => {
  const data = req.body;
  console.log(data, "data from servef file");
  await TiktokDataPost.doc(data.postUserDataObject.uniqueId).set(data);
  res.send({ msg: "Post Added" });
});
app.post("/sendTiktokDataComments", async (req, res) => {
  console.log(req.body, " req in server file");
  const data = req.body;
  await TiktokDataComments.add(data);
  res.send({ msg: "Comments Added" });
});

app.listen(4000, () => {
  console.log("Up and running 4000");
});
