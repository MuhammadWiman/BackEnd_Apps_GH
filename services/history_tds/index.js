require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const { connectRabbit, getChannel } = require("../rabbit");
const TdsHistory = require("../../models/TdsHistory");

async function start() {
  await mongoose.connect(process.env.MONGO_URL);

  await connectRabbit();
  const channel = getChannel();

  const QUEUE = "tds_history";

  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, "amq.topic", QUEUE);

  channel.consume(QUEUE, async msg => {
    try {
      const d = JSON.parse(msg.content.toString());

      if (!d.ip || d.tds_ppm === undefined) {
        channel.ack(msg);
        return;
      }

      await TdsHistory.create(d);
      channel.ack(msg);
    } catch (err) {
       // 🔇 silent duplicate (rolling 6 jam)
      if (err.code === 11000) {
        channel.ack(msg);
        return;
      }
      console.error("TDS history error:", err.message);
      channel.nack(msg, false, false);
    }
  });

  console.log("history-tds ACTIVE");
}

start();
