import ormconfig from '../ormconfig';
import { User } from './user/entities/user.entity';

ormconfig
  .initialize()
  .then(async () => {
    const res = await ormconfig.manager.find(User);
    console.log(
      'Here you can setup and run express / fastify / any other framework.',
      res,
    );
  })
  .catch((error) => console.log(error));
