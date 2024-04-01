import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatsRepository } from './chats.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { ChatDocumentSchema } from './entities/chat.document';
import { MessagesModule } from './messages/messages.module';
import { Chat } from './entities/chat.entity';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatDocumentSchema,
      },
    ]),
    forwardRef(() => MessagesModule),
    UsersModule,
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}
