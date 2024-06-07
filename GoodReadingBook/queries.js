const getCustomer = `SELECT * FROM public."Customer"`;
const getCustomerById = `SELECT * FROM public."Customer" WHERE "Customer"."Customer_Number" = $1`;
const checkCustomerNumber = `SELECT c FROM "Customer" c WHERE "Customer_Number" = $1`;
const addCustomer = `INSERT INTO public."Customer" ("Customer_Number", "Customer_Name", "Address", "City", "State", "Country") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const removeCustomer = `DELETE FROM public."Customer" WHERE "Customer_Number" = $1`;
const updateCustomer = `UPDATE public."Customer" SET "Customer_Name" = $2, "Address" = $3, "City" = $4, "State" = $5, "Country" = $6 WHERE "Customer_Number" = $1 RETURNING *`;

module. exports = {
getCustomer,
getCustomerById,
checkCustomerNumber,
addCustomer,
removeCustomer,
updateCustomer
};