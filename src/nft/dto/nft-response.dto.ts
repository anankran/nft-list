import { ObjectType, Field } from '@nestjs/graphql';
import { NFT } from '../nft.model';

@ObjectType()
export class NFTResponseDto {
  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  pageSize: number;

  @Field()
  cursor: string;

  @Field(() => [NFT])
  result: NFT[];
}