import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      user_ids: createChatInput.userIds || [],
      userId,
      messages: [],
    });
  }

  async findAll(userId: string) {
    return this.chatsRepository.find({
      ...this.userChatFilter(userId),
    });
  }

  findOne(_id: string) {
    return this.chatsRepository.findOne({
      _id,
    });
  }

  public userChatFilter(userId: string) {
    return {
      $or: [
        { userId },
        {
          user_ids: {
            $in: [userId],
          },
        },
        { isPrivate: false },
      ],
    };
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
