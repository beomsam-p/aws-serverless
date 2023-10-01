import type { AWS } from '@serverless/typescript';

const config: AWS = {
  service: 'hello-api-ts',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: 'dev',
    region: 'ap-northeast-2',
    environment: {
      variable1: 'value1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [{ httpApi: { path: '/hello', method: 'get' } }],
    },
  },
  plugins: ['serverless-webpack'],
};
export = config;
