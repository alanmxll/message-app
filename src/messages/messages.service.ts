import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message)
  private readonly messageRepository: Repository<Message>) { }

  async getAll() {
    return await this.messageRepository.find();
  }

  async createMessage(newMessage: CreateMessageDto) {
    const newMsg = new Message();
    newMsg.message = newMessage.message;
    newMsg.nick = newMessage.nick;

    return this.messageRepository.save(newMsg);
  }

  async updateMessage(idMessage: number, updatedMessage: CreateMessageDto) {
    const updatedMsg = await this.messageRepository.findOne(idMessage);
    updatedMsg.nick = updatedMessage.nick;
    updatedMsg.message = updatedMessage.message;

    return await this.messageRepository.save(updatedMessage);
  }

  async deleteMessage(idMessage: number) {
    return await this.messageRepository.delete(idMessage);
  }

}
