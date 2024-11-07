import { Injectable } from '@nestjs/common';
import { SlackMessageOptions, SlackService } from 'nestjs-slack';

@Injectable()
export class SlackNotificationService {
    private readonly CHANNEL_BUG = 'developer'; // Tên kênh Slack mà bạn muốn gửi thông báo

    constructor(private readonly slackService: SlackService) {}

    /**
     * Gửi thông báo lỗi tới Slack
     * @param message - Nội dung thông báo lỗi
     * @param stack - Stack trace của lỗi (tuỳ chọn)
     */
    async sendErrorNotification(message: string): Promise<void> {
        try {
            const slackMessage: SlackMessageOptions = {
                channel: this.CHANNEL_BUG,
                text: `🚨 *Thông báo lỗi trong ứng dụng* 🚨\n*Chi tiết:* ${message}`,
                username: 'BigBugs',
                unfurl_links: true,
                mrkdwn: true,
                icon_emoji: ':beetle:',
            };

            await this.slackService.postMessage(slackMessage);
            console.log('Đã gửi thông báo lỗi đến Slack');
        } catch (error) {
            console.error('Không thể gửi thông báo đến Slack:', error);
        }
    }
}
