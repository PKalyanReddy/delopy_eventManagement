const { Router } = require("express");
const eventModel = require("../model/eventModel");
const role = require("../middleware/role");

const eventRoute = Router();

eventRoute.get("/", async (req, res) => {
  const events = await eventModel.find({ deletedAt: null });
  res.json({ events });
});

eventRoute.post("/", role(["Organizer"]), async (req, res) => {
  const { name, description, date, capacity } = req.body;
  const newEvent = await eventModel.create({ name, description, date, capacity, createdBy: req.user._id });
  res.status(201).json({ message: "Event created successfully", event: newEvent });
});

eventRoute.patch("/:id", role(["Organizer", "Admin"]), async (req, res) => {
  const event = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (event) {
    res.json({ message: "Event updated successfully", event });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

eventRoute.delete("/:id", role(["Admin"]), async (req, res) => {
  const event = await eventModel.findByIdAndUpdate(req.params.id, { deletedAt: new Date() });
  if (event) {
    res.json({ message: "Event soft deleted successfully" });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

module.exports = eventRoute;
