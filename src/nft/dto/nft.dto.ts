import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class NFTDto {
  @Field()
  wallet: string;

  @Field()
  contractType: string;
  
  @Field()
  page: number;
}