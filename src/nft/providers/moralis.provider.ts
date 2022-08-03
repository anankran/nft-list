import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { NFTDto } from '../dto/nft.dto';
import { Wallet, WalletDocument } from '../wallet.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MoralisProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
  ) {}

  async getAll1155TokenToWallet (nftDto: NFTDto): Promise<any> {
    let cursor;
    let compoundKey = `${this.configService.get<string>('NETWORK')}_${nftDto.wallet}`
    let nfts = [];

    while (true) {
      let response = await this.makeRequest(nftDto.wallet, cursor);
      nfts = nfts.concat(response['result']);
      
      if (response['cursor'] == null) {
        break;
      }

      cursor = response['cursor'];
    }

    await this.walletModel.updateOne(
      { compoundKey: compoundKey }, 
      { nfts: nfts }
    );
  }

  async makeRequest (wallet: string, cursor: string): Promise<any> {
    const { status, data } = await this.httpService.get(
      `${this.configService.get<string>('MORALIS_BASE_URL')}/${wallet}/nft`,
      {
        params: {
          'chain': this.configService.get<string>('NETWORK'),
          'format': 'decimal',
          'cursor': cursor
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
