import { ConsoleLogger, Injectable } from '@nestjs/common';
import { MoralisProvider } from './providers/moralis.provider';
import { EtherScanProvider } from './providers/etherscan.provider';
import { NFTDto } from './dto/nft.dto';
import { Wallet, WalletDocument } from './wallet.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';

@Injectable()
export class NFTService {
  constructor (
    private readonly moralisProvider: MoralisProvider,
    private readonly etherscanProvider: EtherScanProvider,
    private readonly configService: ConfigService,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
  ) {}

  async getNFTByProvider(nftDto: NFTDto): Promise<any> {
    let nfts;
    let wallet;
    let compoundKey = `${this.configService.get<string>('NETWORK')}_${nftDto.wallet}`

    wallet = await this.walletModel.findOne({
      compoundKey: compoundKey
    });

    let refreshWallet = false;
    let createdAt = new Date();
    const currentTime = new Date();

    // if (wallet) {
    //   createdAt = new Date(wallet.createdAt.getTime() + 30 * 60000);
    //   nfts = wallet.nfts;
    // }
  
    if (wallet && currentTime >= createdAt) {
      await this.walletModel.deleteMany({ compoundKey: wallet.compoundKey });
      refreshWallet = true;
    }

    if (wallet === null || refreshWallet) {
      this.walletModel.create({
        compoundKey: compoundKey,
        nfts: []
      })
    }

    if (
      (wallet === null || refreshWallet) &&
      this.configService.get<string>('PROVIDER') == 'moralis'
    ) {
      await this.moralisProvider.getAll1155TokenToWallet(nftDto);
      wallet = await this.walletModel.findOne(
        { compoundKey: compoundKey }
      );
    }

    /*
    The two methods above are incomplete, I just kept them in the code because were
    also possibilities I thought. The idea is basically to get the transactions
    of a address and check the "to" and "from" attributes to find out what NFTs
    that it still owns.
    */
    if (
      !wallet &&
      this.configService.get<string>('PROVIDER') == 'etherscan' &&
      nftDto.contractType == 'ERC721'
    ) {
      await this.etherscanProvider.getAllERC721TransactionsToWallet(
        nftDto.wallet,
        nftDto.page
      );
    }
  
    if (!wallet &&
      this.configService.get<string>('PROVIDER') == 'etherscan' &&
      nftDto.contractType == 'ERC1155'
    ) {
      await this.etherscanProvider.getAllERC1155TransactionsToWallet(
        nftDto.wallet,
        nftDto.page
      );
    }

    nfts = this.formatResponse(wallet.nfts, nftDto.page, nftDto.contractType);
    return nfts;
  }

  formatResponse (nfts, page, contractType) {
    let formattedNfts = []
    const limit = page * 50;
    const offset = limit - 50;
    
    for (let i = offset; i < limit; i++) {
      if (!nfts[i] || contractType !== nfts[i]['contract_type']) {
        continue;
      }

      formattedNfts.push({
        'tokenId': nfts[i].token_id,
        'tokenAddress': nfts[i].token_address,
        'amount': nfts[i]['amount'],
        'ownerOf': nfts[i]['owner_of'],
        'tokenHash': nfts[i]['token_hash'],
        'blockNumberMinted': nfts[i]['token_id'],
        'blockNumber': nfts[i]['block_number'],
        'contractType': nfts[i]['contract_type'],
        'name': nfts[i]['name'],
        'symbol': nfts[i]['symbol'],
        'tokenUri': nfts[i]['token_uri'],
        'metadata': nfts[i]['metadata'],
        'lastTokenUriSync': nfts[i]['last_token_uri_sync'],
        'lastMetadataSync': nfts[i]['last_metadata_sync'],
      });
    }
    console.log()

    return {
      page: page,
      total: Math.ceil(nfts.length / 50),
      nfts: formattedNfts
    }
  }
}
