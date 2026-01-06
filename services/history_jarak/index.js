require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const { connectRabbit, getChannel } = require("../rabbit");
const UltrasonicHistory = require("../../models/JarakHistory");

async function start() {
  await mongoose.connect(process.env.MONGO_URL);

  await connectRabbit();
  const channel = getChannel();

  const QUEUE = "jarak_history";

  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, "amq.topic", QUEUE);

  channel.consume(QUEUE, async msg => {
    try {
      const d = JSON.parse(msg.content.toString());

      if (!d.ip || d.distance_cm === undefined) {
        channel.ack(msg);
        return;
      }

      await UltrasonicHistory.create(d);
      channel.ack(msg);
    } catch (err) {
      console.error("Ultrasonic history error:", err.message);
      channel.nack(msg, false, false);
    }
  });

  console.log("history-ultrasonic ACTIVE");
}

start();
