import { Client } from "pg";
import { Router } from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "Not Set");
console.log("DB_PORT:", process.env.DB_PORT);

// Ensure password is a string
if (typeof process.env.DB_PASSWORD !== "string") {
  throw new Error("DB_PASSWORD must be a string");
}

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

export const klineRouter = Router();

klineRouter.get("/", async (req, res) => {
  const { market, interval, startTime, endTime } = req.query;

  let query;
  switch (interval) {
    case "1m":
      query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
      break;
    case "1h":
      query = `SELECT * FROM klines_1m WHERE  bucket >= $1 AND bucket <= $2`;
      break;
    case "1w":
      query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`;
      break;
    default:
      return res.status(400).send("Invalid interval");
  }

  try {
    const result = await pgClient.query(query, [
      new Date((startTime * 1000) as string),
      new Date((endTime * 1000) as string),
    ]);
    res.json(
      result.rows.map((x) => ({
        close: x.close,
        end: x.bucket,
        high: x.high,
        low: x.low,
        open: x.open,
        quoteVolume: x.quoteVolume,
        start: x.start,
        trades: x.trades,
        volume: x.volume,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
