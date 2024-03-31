import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.input';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createMessageInput: CreateMessageInput, userId: string) {
    const message: Message = {
      _id: new Types.ObjectId().toHexString(),
      content: createMessageInput.content,
      userId,
      createdAt: new Date(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: createMessageInput.chatId,
        ...this.userChatFilter(userId),
      },
      {
        $push: {
          messages: message,
        },
      },
    );

    return message;
  }

  async findAll({ chatId }: GetMessagesArgs, userId: string) {
    const chat = await this.chatsRepository.findOne({
      _id: chatId,
      ...this.userChatFilter(userId),
    });

    return chat.messages;
  }

  private userChatFilter(userId: string) {
    return {
      $or: [
        { userId },
        {
          user_ids: {
            $in: [userId],
          },
        },
      ],
    };
  }
}
