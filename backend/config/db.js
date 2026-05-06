import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "event_platform",
});


const [rows] = await db.query("SELECT DATABASE() AS db");

console.log("✅ MySQL Connected");
console.log("📦 Database:", rows[0].db);

export default db;