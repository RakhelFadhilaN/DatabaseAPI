const express = require('express'); 
const pool = require('./db');
const query = require('./queries');

const getCustomer = (req, res) => {
    pool.query(query.getCustomer, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const getCustomerById = (req, res) => {
    const customerNumber = req.params.customerNumber;
    console.log("Received request for customer number:", customerNumber);
    pool.query(query.getCustomerById, [customerNumber], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        if (results.rows.length === 0) {
            console.log("Customer not found for number:", customerNumber);
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        console.log("Found customer:", results.rows[0]);
        res.status(200).json(results.rows[0]);
    });
};

const addCustomer = async (req, res) => {
    const { Customer_Number, Customer_Name, Address, City, State, Country } = req.body;

    if (!Customer_Number || !Customer_Name || !Address || !City || !State || !Country) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkResult = await client.query(query.checkCustomerNumber, [Customer_Number]);
        if (checkResult.rows.length) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: "Customer number already exists!" });
        }

        const addResult = await client.query(query.addCustomer, [Customer_Number, Customer_Name, Address, City, State, Country]);
        await client.query('COMMIT');

        res.status(201).json({ message: "Customer added successfully.", customer: addResult.rows[0] });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error adding customer:", error);
        res.status(500).json({ error: "An error occurred while adding the customer." });
    } finally {
        client.release();
    }
};

const removeCustomer = async (req, res) => {
    const customerNumber = req.params.customerNumber;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const checkResult = await client.query(query.checkCustomerNumber, [customerNumber]);
        if (!checkResult.rows.length) {
            await client.query('ROLLBACK');
            return res.status(404).send("No customer to remove");
        }

        await client.query(query.removeCustomer, [customerNumber]);
        await client.query('COMMIT');

        res.status(200).send("Customer removed successfully.");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "An error occurred while deleting the customer." });
    } finally {
        client.release();
    }
};

const updateCustomer = async (req, res) => {
    const { Customer_Number, Customer_Name, Address, City, State, Country } = req.body;
    const client = await pool.connect();

    if (!Customer_Number || !Customer_Name || !Address || !City || !State || !Country) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await client.query('BEGIN');
        const checkResult = await client.query(query.checkCustomerNumber, [Customer_Number]);
        if (!checkResult.rows.length) {
            await client.query('ROLLBACK');
            return res.status(404).send("No customer to update");
        }

        const updateResult = await client.query(query.updateCustomer, [Customer_Number, Customer_Name, Address, City, State, Country]);
        await client.query('COMMIT');

        res.status(200).json({ message: "Customer updated successfully.", customer: updateResult.rows[0] });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "An error occurred while updating the customer." });
    } finally {
        client.release();
    }
};

module.exports = {
    getCustomer,
    getCustomerById,
    addCustomer,
    removeCustomer,
    updateCustomer,
    express 
};
