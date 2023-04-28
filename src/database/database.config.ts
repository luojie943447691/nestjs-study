import { registerAs } from '@nestjs/config';

// 该函数会在 .env 等所有环境文件加载完毕之后才会执行
export default registerAs('database', () => {
  // console.log('===', process.env.DB_HOST);

  return {};
});
