import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FileUploadOptions } from './types/file-upload-options.interface';

@Injectable()
export class S3Service {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const accessKey = this.configService.get('AWS_ACCESS_KEY');
    const secretKey = this.configService.get('AWS_SECRET_ACCESS_KEY');

    const clientConfig: S3ClientConfig = {};

    if (!accessKey || !secretKey) {
      throw new Error('AWS credentials not found');
    }

    clientConfig.credentials = {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    };

    this.client = new S3Client(clientConfig);
  }

  async upload({ bucket, file, key }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
      }),
    );
  }

  getObjectUrl(bucket: string, key: string) {
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
}
