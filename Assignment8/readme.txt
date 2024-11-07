const express = require("express"); - Imports the Express framework to build and manage the API server.
const app = express(); - Initializes an Express application instance.
const mongoose = require("mongoose"); - Imports Mongoose to interact with the MongoDB database.
const bcrypt = require("bcrypt"); - Imports bcrypt to securely hash and store user passwords.
const multer = require("multer"); - Imports multer to handle image file uploads with format validation.
const path = require("path"); - Imports the path module to manage file and directory paths for file uploads.
app.use(express.json()); - Configures Express to parse JSON data in request bodies.
mongoose.connect(...) - Establishes a connection to the MongoDB database with specified URL and options.
userSchema - Defines a schema for users, with fields for name, email, password, and imagePath.
const User = mongoose.model("User", userSchema); - Creates a Mongoose model for the User schema.
Multer Storage Configuration - Defines a custom storage configuration to save uploaded files in the images/ directory with a timestamped filename.
Multer File Filter - Sets file type restrictions for image uploads, allowing only JPEG, PNG, and GIF formats.
app.post("/user/create", async (req, res) => {...}); - Endpoint for creating a new user, hashing the password and saving to the database.
app.put("/user/edit", async (req, res) => {...}); - Endpoint for updating a user’s name and password with validation.
app.delete("/user/delete", async (req, res) => {...}); - Endpoint for deleting a user by their email address.
app.get("/user/getAll", async (req, res) => {...}); - Endpoint to retrieve all users' information from the database.
app.post("/user/uploadImage", upload.single("image"), async (req, res) => {...}); - Endpoint for uploading a user’s image, saving the file path in the user's profile.
app.listen(3000, () => {...}); - Starts the server on port 3000, making the API available for requests.