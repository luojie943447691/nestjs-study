import { DoneCallback, Job } from 'bull';

export default function (job: Job, done?: DoneCallback) {
  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  done(null, 'processor2 works');
}
