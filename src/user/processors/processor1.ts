import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';

export default () => {
  const logger = new Logger();
  return function (job: Job, done?: DoneCallback) {
    logger.warn(`nonameProcess ${JSON.stringify(job.data)}`);
    done(null, 'processor1 works');
  };
};
