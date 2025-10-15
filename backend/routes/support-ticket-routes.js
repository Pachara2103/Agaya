const express = require('express');
const router = express.Router();
const {createTicket, updateTicket, getTickets} = require('../controllers/support-ticket-controller');
const {protect, authorize} = require('../middleware/auth');

router.post('/', protect, createTicket);

router.put('/:ticketId', protect, authorize("admin"), updateTicket);

router.get('/', protect, getTickets);


module.exports = router