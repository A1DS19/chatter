import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@ArgsType()
export class MessageCreatedArgs {
  @Field(() => [String])
  @IsNotEmpty()
  @IsArray({ each: true })
  chatIds: string[];
}
