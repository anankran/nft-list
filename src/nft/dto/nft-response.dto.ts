import { ObjectType, Field } from '@nestjs/graphql';
import { NFTModel } from '../nft.model';

@ObjectType()
export class NFTResponseDto {
  @Field()
  total: number;

  @Field()
  page: number;

  @Field(type => [NFTModel], { nullable: true })
  nfts?: NFTModel[] | null;
}