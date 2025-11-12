import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
} from 'typeorm';

@EventSubscriber()
export class DatabaseSubscriber
  implements EntitySubscriberInterface
{
  async afterListen(connection: Connection): Promise<void> {
    // This ensures the uuid-ossp extension is enabled in the public schema,
    // making uuid_generate_v4() available globally across the database.
    await connection.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }
}