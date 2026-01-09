import express from "express";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());

// Add rate limiting to prevent DDoS attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

app.use(limiter);

// Add security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.get("/hi", (req, res) => {
    res.send({
        message: "hi there!"
    })
})

app.post("/signup", async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // Input validation - check types first
        if (typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                error: "Invalid input types - username and password must be strings"
            });
        }

        // Trim and validate non-empty
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            return res.status(400).json({
                error: "Username and password are required and cannot be empty"
            });
        }

        if (trimmedUsername.length < 3 || trimmedUsername.length > 50) {
            return res.status(400).json({
                error: "Username must be between 3 and 50 characters"
            });
        }

        if (trimmedPassword.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long"
            });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

        const user = await prismaClient.users.create({
            data: {
                username: trimmedUsername,
                password: hashedPassword
            }
        })

        res.json({
            message: "signup successful!",
            id: user.id
        })
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            error: "An error occurred during signup"
        });
    }
})


app.listen(3002, () => {
    console.log("server listening on the port 3002");

})