import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'NFT' })
export class NFT {
  @Field(type => ID)
  tokenId: string;

  @Field()
  tokenAddress: string;

  @Field()
  amount: string;

  @Field()
  ownerOf: string;

  @Field()
  tokenHash: string;

  @Field()
  blockNumberMinted: string;

  @Field()
  blockNumber: string;

  @Field()
  contractType: string;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  tokenUri: string;

  @Field()
  metadata: string;

  @Field()
  lastTokenUriSync: string;

  @Field()
  lastMetadataSync: string;
}
