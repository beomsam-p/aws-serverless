import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2, APIGatewayProxyResult } from 'aws-lambda';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as tar from 'tar';

export const optimizeAndUpload: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body || !event.isBase64Encoded) {
    return {
      statusCode: 400,
      body: '',
    };
  }

  const buffer = Buffer.from(event.body, 'base64');
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  const filePath = `/tmp/${hash}.jpg`;
  fs.writeFileSync(filePath, buffer);
  try {
    //최적화 및 s3 upload
    await unpackJpegoptim();

    return { cdnURL: 'CDN-URL' };
  } finally {
    // 파일 제거
    fs.unlinkSync(filePath);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

const jpegoptimPath = '/tmp/bin/jpegoptim';
const jpegoptimPackFile = 'jpeoptim.tar.gz';
export const unpackJpegoptim = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (fs.existsSync(jpegoptimPath)) {
      return resolve();
    }
    fs.createWriteStream(jpegoptimPackFile)
      .pipe(tar.x({ strip: 1, C: '/tmp' }).on('error', reject).on('close', resolve))
      .on('error', reject);
  });
};
