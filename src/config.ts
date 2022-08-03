import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './nft/wallet.schema';
import 'dotenv/config';


export const config = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  HttpModule.register({
    timeout: 6000
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
  }),
  MongooseModule.forRoot(process.env.MONGODB_URL),
  MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
];
