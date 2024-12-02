const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;



app.use(bodyParser.json());
app.use(cors());


mongoose
  .connect("mongodb://127.0.0.1:27017/Mayur", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));


app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/api/images", (req, res) => {
  const imagesDirectory = path.join(__dirname, "images");

  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan directory" });
    }

    const imageUrls = files.map(file => ({
      img: `http://localhost:${PORT}/images/${file}`,
      title: file,
    }));
    

    res.json(imageUrls);
  });
});

app.use("/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
