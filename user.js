router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});