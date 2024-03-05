import { pool } from '../db.js';

export const ping = async (req, resp) => {
    const [result] = await pool.query("SELECT 1 + 1 AS RESULT");
    resp.json(result)
}