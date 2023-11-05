const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

// Define some sample interests
const sampleInterests = [
  "Hiking",
  "Reading",
  "Gaming",
  "Cooking",
  "Traveling",
  "Painting",
  "Photography",
  "Music",
  "Sports",
  "Programming",
];

app.get("/", (req, res) => {
  res.send("Welcome to dummy user data api");
});

app.get("/generate-users/:count", (req, res) => {
  const count = parseInt(req.params.count);

  if (isNaN(count)) {
    return res.status(400).json({ error: "Invalid number" });
  }

  const dummyUsers = generateDummyUsers(count);
  res.json(dummyUsers);
});

function generateDummyUsers(count) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const userInterests = generateRandomInterests();

    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      phone: `+1-555-555-${i.toString().padStart(4, "0")}`,
      address: `123 Main St, City ${i}, Country`,
      age: Math.floor(Math.random() * 30) + 20, // Random age between 20 and 49
      gender: i % 2 === 0 ? "Male" : "Female",
      interests: userInterests,
      company: `Company ${i}`,
      jobTitle: `Job Title ${i}`,
      website: `https://user${i}website.com`,
    });
  }

  return users;
}

function generateRandomInterests() {
  const numInterests = Math.floor(Math.random() * 5) + 4; // Generate 1 to 5 random interests
  const shuffledInterests = sampleInterests.sort(() => 0.5 - Math.random()); // Shuffle the sample interests array
  return shuffledInterests.slice(0, numInterests);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
