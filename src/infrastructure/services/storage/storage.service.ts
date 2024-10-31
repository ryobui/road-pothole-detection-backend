import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { GaxiosError } from 'googleapis-common';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
    constructor(private readonly configService: ConfigService) {}

    private async driveInstance() {
        const auth = await this.authorize();
        return google.drive({ version: 'v3', auth });
    }

    private async authorize() {
        const clientEmail = this.configService.get('googleAccountService.clientEmail');
        const privateKey = this.configService
            .get('googleAccountService.privateKey')
            .split(String.raw`\n`)
            .join('\n');

        const scopes = ['https://www.googleapis.com/auth/drive'];
        const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, scopes);
        await jwtClient.authorize();
        return jwtClient;
    }

    async uploadFile(file: Express.Multer.File) {
        try {
            const drive = await this.driveInstance();
            const response = await drive.files.create({
                requestBody: {
                    name: file.originalname,
                    mimeType: file.mimetype,
                    parents: [this.configService.get('GOOGLE_DRIVE_FOLDER_ID')],
                },
                media: {
                    body: Readable.from(file.buffer),
                },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private async setFilePermissions(fileId: string) {
        const drive = await this.driveInstance();
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
    }

    private handleError(error: any) {
        console.log(error);
        if (error instanceof GaxiosError) {
            throw new HttpException(
                error.message,
                error.response?.status || HttpStatus.BAD_REQUEST,
            );
        }
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
