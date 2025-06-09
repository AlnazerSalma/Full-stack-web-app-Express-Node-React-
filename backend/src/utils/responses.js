const sendNotFound = (res, message = 'Resource not found') =>
    res.status(404).json({ error: message });

const sendBadRequest = (res, message = 'Bad request') =>
    res.status(400).json({ error: message });

const sendServerError = (res, message = 'Internal server error') =>
    res.status(500).json({ error: message });

const sendOk = (res, data = {}, message = 'Success') =>
    res.status(200).json({ message, ...data });

const sendCreated = (res, data = {}, message = 'Resource created') =>
    res.status(201).json({ message, ...data });
module.exports = {
    sendNotFound,
    sendBadRequest,
    sendServerError,
    sendOk,
    sendCreated,
};
