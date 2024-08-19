const { Router } = require("express");
const os = require("os");
const eventModel = require("../model/eventModel");

const monitoringRoute = Router();

monitoringRoute.get("/health", async (req, res) => {
  const uptime = os.uptime();
  const memoryUsage = process.memoryUsage().rss;
  const dbConnection = await eventModel.db.readyState;

  res.json({
    status: "OK",
    uptime,
    memoryUsage,
    dbConnection: dbConnection ? "Connected" : "Disconnected",
  });
});

module.exports = monitoringRoute;
