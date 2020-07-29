const { uuid } = require("uuidv4");
const { isUuid } = require("uuidv4");

function middleware(request, response, next) {
    const { method, url, params: { id } } = request;

    if (!id && isUuid(id)) {
        return response.status(400).json({ error: "Invalid project ID."})
    }

    const logLabel = `[${method.toUpperCase()}] - ${url}`;
  
    console.log(logLabel);
  
    next();
}

module.exports = middleware;