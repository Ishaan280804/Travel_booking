db.users.insertOne({
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$LDw45IaPZbeuEGl2mpZ9OOnclbbovBLU4yknatnkNGKjIkagnP3We", // Replace with the hashed password
    role: "admin"
});
