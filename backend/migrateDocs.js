require("dotenv").config();
const mongoose = require("mongoose");
const WorkerForm = require("./src/models/WorkerForm");
const { conn } = require("./src/db");

async function migrate() {
    try {
        console.log("Starting migration...");
        const result = await WorkerForm.updateMany(
            { $or: [{ aadharNumber: { $exists: false } }, { panNumber: { $exists: false } }] },
            { $set: { aadharNumber: "", panNumber: "" } }
        );
        console.log("Migration complete:", result);
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
