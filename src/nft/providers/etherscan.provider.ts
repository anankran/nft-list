import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EtherScanProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getAllERC721TransactionsToWallet (wallet: string, page: number): Promise<any> {
    const { status, data } = await this.httpService.get(
      this.configService.get<string>('ETHESCAN_BASE_URL'),
      {
        params: {
          'module': 'account',
          'action': 'tokennfttx',
          'page': page,
          'offset': 100,
          'address': wallet,
          'apikey': this.configService.get<string>('ETHESCAN_API_KEY')
        }
      }
    ).toPromise();
    return data;
  }

  async getAllERC1155TransactionsToWallet (wallet: string, page: number): Promise<any> {
    const { status, data } = await this.httpService.get(
      this.configService.get<string>('ETHESCAN_BASE_URL'),
      {
        params: {
          'module': 'account',
          'action': 'token1155tx',
          'page': page,
          'offset': 100,
          'address': wallet,
          'apikey': this.configService.get<string>('ETHESCAN_API_KEY')
        }
      }
    ).toPromise();
    return data;
  }
}
