import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SlackModule, SlackService } from 'nestjs-slack';
import { SlackNotificationService } from './slack-notification.service';

@Module({
    imports: [
        SlackModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'webhook',
                webhookOptions: {
                    url: configService.get<string>('slack.webhookAPI'),
                },
            }),
        }),
    ],
    providers: [SlackNotificationService, SlackService],
    exports: [SlackNotificationService],
})
export class SlackNotificationModule {}
