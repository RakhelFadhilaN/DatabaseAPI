const express = require('express');
const { Router } = require('express'); 
const bodyParser = require('body-parser');
const controller = require('./controller');
const router = Router();

router.use(express.json());
router.use(bodyParser.json());
router.get('/', controller.getCustomer);
router.post('/', controller.addCustomer);
router.put('/:customerNumber', controller.updateCustomer);
router.get('/:customerNumber', controller.getCustomerById);
router.delete('/:customerNumber', controller.removeCustomer);

module.exports = router;
