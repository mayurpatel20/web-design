// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 4000;


// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes


// mongoose.connect('mongodb://localhost:27017/userdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch((error) => console.error('MongoDB connection error:', error));


// app.use('/user', require('./routes/userRoutes'));



// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// -----------------

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/userdb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.error("MongoDB connection error:", error));

// // Static file serving for images
// app.use("/images", express.static(path.join(__dirname, "images")));

// // Endpoint to list all images in the "images" folder
// app.get("/api/images", (req, res) => {
//   const imagesDirectory = path.join(__dirname, "images");

//   fs.readdir(imagesDirectory, (err, files) => {
//     if (err) {
//       return res.status(500).json({ message: "Unable to scan directory" });
//     }

//     // Create an array of URLs for each image file
//     const imageUrls = files.map(file => ({
//       img: 'http://localhost:${PORT}/images/${file}',
//       title: file,
//     }));

//     res.json(imageUrls);
//   });
// });

// // User routes (existing routes)
// app.use("/user", require("./routes/userRoutes"));

// // Start the server
// app.listen(PORT, () => {
//   console.log('Server running on port ${PORT}');
// });


//---------------


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Mayur")
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Error connecting to DB:", error));

// Static file serving for images
app.use("/images", express.static(path.join(__dirname, "images")));

// Endpoint to list all images in the "images" folder
app.get("/api/images", (req, res) => {
  const imagesDirectory = path.join(__dirname, "images");

  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan directory" });
    }

    // Create an array of URLs for each image file
    const imageUrls = files.map(file => ({
      img: `http://localhost:${PORT}/images/${file}`,
      title: file,
    }));

    res.json(imageUrls);
  });
});

// User routes (existing routes)
app.use("/user", require("./routes/userRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
