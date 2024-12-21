import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GmailService {
    private oAuthClient: any;

    constructor(private configService: ConfigService) {
        this.initializeGmailClient();
    }

    private initializeGmailClient() {
        const clientID = this.configService.get('googleapis.clientId');
        const clientSecret = this.configService.get('googleapis.clientSecret');
        const redirectUrl = this.configService.get('googleapis.redirectUrl');
        const refreshToken = this.configService.get('googleapis.refreshToken');

        this.oAuthClient = new google.auth.OAuth2(clientID, clientSecret, redirectUrl);
        this.oAuthClient.setCredentials({ refresh_token: refreshToken });
    }

    private async createTransport() {
        const accessToken = await this.oAuthClient.getAccessToken();
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('googleapis.userEmail'),
                clientId: this.oAuthClient._clientId,
                clientSecret: this.oAuthClient._clientSecret,
                refreshToken: this.oAuthClient.credentials.refresh_token,
                accessToken: accessToken.token,
            },
        });
    }

    async sendMail(to: string, subject: string, message: string): Promise<boolean> {
        try {
            const transport = await this.createTransport();
            const mailOptions = this.setMailOptions(to, subject, message);
            await transport.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error sending email');
        }
    }

    private setMailOptions(to: string, subject: string, message: string) {
        const senderName = this.configService.get('emailName');
        return {
            from: `"${senderName}" <${this.configService.get('googleapis.userEmail')}>`,
            to,
            subject,
            html: message,
        };
    }
}
