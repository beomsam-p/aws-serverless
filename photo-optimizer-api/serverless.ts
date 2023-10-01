import type { AWS } from '@serverless/typescript';

const config: AWS = {
  service: 'photo-optimizer-api',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: 'dev',
    region: 'ap-northeast-2',
  },
  functions: {
    optimizeAndUpload: {
      handler: 'handler.optimizeAndUpload',
      events: [{ httpApi: { path: '/optimizeAndUpload', method: 'put' } }],
    },
  },
  plugins: ['serverless-webpack'],
};
export = config;
