import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const config: any = [
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
  })
];
