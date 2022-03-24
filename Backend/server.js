import express from "express";
import cors from "cors";
import getPostData from "./index.js";
import TiktokData from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sendTiktokData", async (req, res) => {
  console.log(getPostData(), " total post adata");
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "Data Added" });
});

app.listen(4000, () => {
  console.log("Up and running 4000");
});
