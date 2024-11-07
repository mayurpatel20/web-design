const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

app.use(express.json());

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/Mayur", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch((error) => {
    console.log("Error connecting to DB:", error);
});

// User schema with an added imagePath field
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Name should be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password should be at least 8 characters long"]
    },
    imagePath: {
        type: String,
        default: null
    }
});

const User = mongoose.model("User", userSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images only (jpeg, png, gif)!");
        }
    }
});

// POST: Create a new user with validations
app.post("/user/create", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT: Update user details
app.put("/user/edit", async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (name) {
            if (name.length < 3) {
                return res.status(400).json({ error: "Name should be at least 3 characters long" });
            }
            user.name = name;
        }
        if (password) {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongPasswordRegex.test(password)) {
                return res.status(400).json({ error: "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character" });
            }
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete a user by email
app.delete("/user/delete", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Retrieve all users
app.get("/user/getAll", async (req, res) => {
    try {
        const users = await User.find({}, "name email password imagePath");
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// POST: Upload Image
app.post("/user/uploadImage", upload.single("image"), async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.imagePath = req.file.path;
        console.log(user.imagePath);
        await user.save();
        res.status(200).json({ message: "Image uploaded successfully", imagePath: req.file.path });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
