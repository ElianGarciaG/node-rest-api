import { json } from "express";
import { pool } from "../db.js";

export const getEmployees = async (req, resp) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    resp.json(rows);
  } catch (error) {
    return resp.status(402).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployeesById = async (req, resp) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return resp.status(404).json({
        message: "Employee not found",
      });
    resp.json(rows[0]);
  } catch (error) {
    return resp.status(402).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployees = async (req, resp) => {
  const { name, salary } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    resp.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return resp.status(402).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployees = async (req, resp) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return resp.status(404).json({
        message: "Employee not found",
      });

    resp.json("received");
  } catch (error) {
    return resp.status(402).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployees = async (req, resp) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return resp.status(404).json({
        message: "Employee deleted",
      });
    resp.sendStatus(204);
  } catch (error) {
    return resp.status(402).json({
      message: "Something goes wrong",
    });
  }
};
