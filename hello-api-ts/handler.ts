import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const hello = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
