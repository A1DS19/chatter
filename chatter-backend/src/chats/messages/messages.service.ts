import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.input';
import { PUB_SUB } from 'src/common/constants/injection.tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageCreatedArgs } from './dto/message-created.args';
import { ChatsService } from '../chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly chatService: ChatsService,
  ) {}

  async create(createMessageInput: CreateMessageInput, userId: string) {
    const message: Message = {
      _id: new Types.ObjectId().toHexString(),
      content: createMessageInput.content,
      userId,
      createdAt: new Date(),
      chatId: createMessageInput.chatId,
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: createMessageInput.chatId,
        ...this.chatService.userChatFilter(userId),
      },
      {
        $push: {
          messages: message,
        },
      },
    );

    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: message,
    });
    return message;
  }

  async findAll({ chatId }: GetMessagesArgs, userId: string) {
    const chat = await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatService.userChatFilter(userId),
    });

    return chat.messages;
  }

  async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
    await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatService.userChatFilter(userId),
    });

    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }
}
