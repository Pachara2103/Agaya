const auditLog = require('../models/audit-log');
const createError = require('http-errors');

exports.logAction = async ({ user, action, resource, resourceId, changes }) => {
  await auditLog.create({ user, action, resource, resourceId, changes });
};
