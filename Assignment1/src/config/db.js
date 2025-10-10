// src/config/db.js
const mongoose = require('mongoose');

async function connectDB(uri) {
  const dbName = process.env.DB_NAME || 'comp3123_assignment1';

  await mongoose.connect(uri, {
    dbName,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    authSource: 'admin',   // Atlas SCRAM users live in the "admin" database
    autoIndex: true
  });

  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected -> host: ${host}, db: ${name}`);

  // (optional) quick auth diagnostics
  try {
    const res = await mongoose.connection.db.admin().command({ connectionStatus: 1, showPrivileges: true });
    console.log('AUTH USERS:', res.authInfo.authenticatedUsers);
    console.log('AUTH ROLES:', res.authInfo.authenticatedUserRoles);
  } catch (e) {
    console.log('connectionStatus check failed:', e.message);
  }
}

module.exports = { connectDB };
