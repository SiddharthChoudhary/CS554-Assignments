const url = require('url');
const URL_COUNTER_LOGGER = {};

function urlLogger(req, res, next) {
    const { originalUrl } = req;
    
    let originalUrlPathName = url.parse(originalUrl).pathname;
    if (URL_COUNTER_LOGGER[originalUrlPathName]) {
        URL_COUNTER_LOGGER[originalUrlPathName]++;
    } else {
        URL_COUNTER_LOGGER[originalUrlPathName] = 1;
    }
    if (Object.keys(URL_COUNTER_LOGGER).length > 0) {
        console.log('Count :\n', URL_COUNTER_LOGGER);
    }
    next();
}

function requestLogger(req, res, next) {
    console.log(
        `\n[${new Date().toUTCString()}] ${req.method} ${url.parse(req.originalUrl).pathname}`
    );
    next();
}
module.exports={
    requestLogger,
    urlLogger
}