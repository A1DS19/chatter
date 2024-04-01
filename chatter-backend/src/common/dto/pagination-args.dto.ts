import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Number)
  skip: number;

  @Field(() => Number)
  limit: number;
}
