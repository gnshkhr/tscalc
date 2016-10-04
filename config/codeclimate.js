require('dotenv').config();
const execSync = require('child_process').execSync;

const out = execSync('codeclimate-test-reporter < coverage/lcov.info');
console.log(out.toString());
