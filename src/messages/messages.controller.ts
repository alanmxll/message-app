import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';
import { response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private messageServices: MessagesService) {

  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
    this.messageServices.createMessage(createMessageDto)
      .then(
        message => {
          response.status(HttpStatus.CREATED)
            .json(message)
        })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error on create message' })
      });
  }

  @Get()
  getAll(@Res() response) {
    this.messageServices.getAll()
      .then(messagesList => {
        response.status(HttpStatus.OK)
          .json(messagesList);
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error on get messages' })
      });
  }

  @Put(':id')
  update(@Body() updateMessageDto: CreateMessageDto, @Res() response, @Param('id') idMessage) {
    this.messageServices.updateMessage(idMessage, updateMessageDto)
      .then(message => {
        return response.status(HttpStatus.OK)
          .json(message)
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error on update message' })
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idMessage) {
    this.messageServices.deleteMessage(idMessage)
      .then(res => {
        response.status(HttpStatus.OK)
          .json(res)
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error on delete message' })
      });
  }

}
