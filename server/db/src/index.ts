import { Client } from "pg";
import { createClient } from "redis"; // Adjust the import based on your project structure
import type { DbMessage } from "./types";

// Print environment variables for debugging
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT,
});

const pgClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

pgClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Failed to connect to PostgreSQL:", err);
    process.exit(1);
  });

async function main() {
  const redisClient = createClient();
  await redisClient.connect();
  console.log("connected to redis");

  while (true) {
    const response = await redisClient.rPop("db_processor" as string);
    if (!response) {
    } else {
      const data: DbMessage = JSON.parse(response);
      if (data.type === "TRADE_ADDED") {
        console.log("adding data");
        console.log(data);
        const price = data.data.price;
        const timestamp = new Date(data.data.timestamp);
        const query = "INSERT INTO tata_prices (time, price) VALUES ($1, $2)";
        // TODO: How to add volume?
        const values = [timestamp, price];
        await pgClient.query(query, values);
      }
    }
  }
}

main();
