import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Job } from 'bull';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Processor('user')
export class UserConsumer {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  // @Process()
  // nonameProcess(job: Job) {
  //   this.logger.warn(`nonameProcess ${JSON.stringify(job.data)}`);
  // }

  @Process('userId')
  userIdProcess(job: Job) {
    this.logger.warn(`userIdProcess ${JSON.stringify(job.data)}`);
  }

  // 在 user 队列中进入活动状态时发出的事件
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }
}
