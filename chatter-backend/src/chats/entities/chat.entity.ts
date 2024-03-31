import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field(() => [String])
  @Prop([String])
  user_ids: string[];

  @Prop([Message])
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
