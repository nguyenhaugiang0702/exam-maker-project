import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { ExamsModule } from './modules/exams/exams.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
// MongoDB
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // đảm bảo .env tự load
    }),
    UsersModule, QuestionsModule, ExamsModule, 
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}

