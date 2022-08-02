import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { NFTDto } from '../dto/nft.dto';

@Injectable()
export class MoralisProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getAllNFTsTokenToWallet (nftDto: NFTDto): Promise<any> {
    const { status, data } = await this.httpService.get(
      `${this.configService.get<string>('MORALIS_BASE_URL')}/${nftDto.wallet}/nft`,
      {
        params: {
          'chain': this.configService.get<string>('NETWORK'),
          'format': 'decimal',
        },
        headers: {
          'Accept': 'application/json',
          'X-API-Key': this.configService.get<string>('MORALIS_API_KEY'),
        },
      }
    ).toPromise();
    return data;
  }
}
