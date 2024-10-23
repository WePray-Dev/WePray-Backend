var dotenv = require('dotenv');
if (process.env.NODE_ENV != 'production') {
    dotenv.config({ path: '.env' });
}
module.exports = {
    app_name: process.env.APP_NAME || 'WE-PRAY',
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    cookie_session_secret: process.env.COOKIE_SESSION_SECRET
}

