import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  @Prop()
  compoundKey: string;

  @Prop()
  nfts: [any];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
