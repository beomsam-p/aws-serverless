"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
('use strict');
const hello = async (event) => {
    event.queryStringParameters;
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
        return { statusCode: 404, body: 'Not Found' };
    }
    const name = event.queryStringParameters.name;
    console.log(`my name is ${name}`);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `hello ${name}`,
            input: event,
        }),
    };
};
exports.hello = hello;
