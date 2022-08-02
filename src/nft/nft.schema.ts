import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NFT {
  @Prop()
  tokenId: string;

  @Prop()
  tokenAddress: string;

  @Prop()
  amount: string;

  @Prop()
  ownerOf: string;

  @Prop()
  tokenHash: string;

  @Prop()
  blockNumberMinted: string;

  @Prop()
  blockNumber: string;

  @Prop()
  contractType: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  tokenUri: string;

  @Prop()
  metadata: string;

  @Prop()
  lastTokenUriSync: string;

  @Prop()
  lastMetadataSync: string;
}

export const CatSchema = SchemaFactory.createForClass(NFT);