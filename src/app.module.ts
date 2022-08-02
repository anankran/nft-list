import { Module } from '@nestjs/common';
import { config } from './config';
import { NFTController } from './nft/nft.controller';
import { NFTService } from './nft/nft.service';
import { NFTResolver } from './nft/nft.resolver';
import { MoralisProvider } from './nft/providers/moralis.provider';
import { EtherScanProvider } from './nft/providers/etherscan.provider';

@Module({
  imports: [...config],
  controllers: [NFTController],
  providers: [
    NFTService,
    MoralisProvider,
    EtherScanProvider,
    NFTResolver,
  ],
})
export class AppModule {}
