import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class UserProducer {
  constructor(
    @InjectQueue('user') private userQueue: Queue,
    @InjectQueue('second-user') private secondUserQueue: Queue,
  ) {}

  async sendMessage(message: string) {
    await this.userQueue.add('userId', {
      message,
    });
    await this.secondUserQueue.add('userId', {
      message,
    });
  }

  async sendNoNameMessage(message: string) {
    await this.userQueue.add({
      message,
    });

    await this.secondUserQueue.add({
      message,
    });
  }
}
