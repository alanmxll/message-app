import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'messageapp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message])
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule { }
