import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.input';
import { PUB_SUB } from 'src/common/constants/injection.tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageDocument } from './entities/message.document';
import { Message } from './entities/message.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly usersService: UsersService,
  ) {}

  async create(createMessageInput: CreateMessageInput, userId: string) {
    const message: MessageDocument = {
      _id: new Types.ObjectId().toHexString(),
      content: createMessageInput.content,
      userId: Types.ObjectId.createFromHexString(userId),
      createdAt: new Date(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: createMessageInput.chatId,
      },
      {
        $push: {
          messages: message,
        },
      },
    );

    const messageEntity: Message = {
      ...message,
      chatId: createMessageInput.chatId,
      user: await this.usersService.findOne(message.userId.toHexString()),
    };

    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: messageEntity,
    });
    return messageEntity;
  }

  async findAll({ chatId, limit, skip }: GetMessagesArgs) {
    const messages = await this.chatsRepository.model.aggregate([
      { $match: { _id: new Types.ObjectId(chatId) } },
      { $unwind: '$messages' },
      { $replaceRoot: { newRoot: '$messages' } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $unset: 'userId' },
      { $set: { chatId } },
    ]);

    return messages.map((message) => ({
      ...message,
      user: this.usersService.toEntity(message.user),
    }));
  }

  async getMessagesCount(chatId: string) {
    return (
      await this.chatsRepository.model.aggregate([
        { $match: { _id: new Types.ObjectId(chatId) } },
        { $unwind: '$messages' },
        { $count: 'messages' },
      ])
    )[0];
  }

  async messageCreated() {
    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }
}
