const amqp = require("amqplib");

let connection;
let channel;

function buildAmqpUrl() {
  const {
    RABBITMQ_USER,
    RABBITMQ_PASS,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_VHOST
  } = process.env;

  if (!RABBITMQ_USER || !RABBITMQ_PASS || !RABBITMQ_HOST || !RABBITMQ_VHOST) {
    throw new Error("RabbitMQ env not complete");
  }

  // PASTI encode vhost (WAJIB)
  const vhost = encodeURIComponent(RABBITMQ_VHOST);

  // HASIL AKHIR: /%2Fai-automation
  return `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/${vhost}`;
}

async function connectRabbit() {
  if (channel) return channel;

  const url = buildAmqpUrl();
  console.log("RabbitMQ URL:", url);

  connection = await amqp.connect(url);

  connection.on("error", err => {
    console.error("RabbitMQ error:", err.message);
    process.exit(1);
  });

  connection.on("close", () => {
    console.error("RabbitMQ connection closed");
    process.exit(1);
  });

  channel = await connection.createChannel();
  await channel.assertExchange("amq.topic", "topic", { durable: true });

  return channel;
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ not connected");
  return channel;
}

module.exports = { connectRabbit, getChannel };
