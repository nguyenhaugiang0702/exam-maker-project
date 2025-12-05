import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongoConfigService.name);

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.MONGO_URL,
      connectionFactory: (connection) => {
        this.logger.log('MongoDB connected successfully');
        return connection;
      },
    };
  }
}
