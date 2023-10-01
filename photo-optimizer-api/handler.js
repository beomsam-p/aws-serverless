"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeAndUpload = void 0;
const crypto = require("crypto");
const fs = require("fs");
const optimizeAndUpload = async (event) => {
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
        return { cdnURL: 'CDN-URL' };
    }
    finally {
        // 파일 제거
        fs.unlinkSync(filePath);
    }
    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};
exports.optimizeAndUpload = optimizeAndUpload;
