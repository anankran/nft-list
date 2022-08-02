import { Injectable } from '@nestjs/common';
import { MoralisProvider } from './providers/moralis.provider';
import { EtherScanProvider } from './providers/etherscan.provider';
import { NFTDto } from './dto/nft.dto';

@Injectable()
export class NFTService {
  constructor (
    private readonly moralisProvider: MoralisProvider,
    private readonly etherscanProvider: EtherScanProvider,
  ) {}

  async getNFTByProvider(nftDto: NFTDto): Promise<any> {
    if (process.env['PROVIDER'] == 'moralis') {
      const nfts = await this.moralisProvider.getAllNFTsTokenToWallet(nftDto);
      let response = {
        'total': nfts['total'],
        'page': nfts['page'],
        'pageSize': nfts['page_size'],
        'cursor': nfts['cursor'],
        'result': []
      };
      for (let key in nfts['result']) {
        if (nfts['result'][key]['contract_type'] != nftDto.contractType) {
          continue;
        }
        response['result'][key] = {
          'tokenId': nfts['result'][key]['token_id'],
          'tokenAddress': nfts['result'][key]['token_address'],
          'amount': nfts['result'][key]['amount'],
          'ownerOf': nfts['result'][key]['owner_of'],
          'tokenHash': nfts['result'][key]['token_hash'],
          'blockNumberMinted': nfts['result'][key]['block_number_minted'],
          'blockNumber': nfts['result'][key]['block_number'],
          'contractType': nfts['result'][key]['contract_type'],
          'name': nfts['result'][key]['name'],
          'symbol': nfts['result'][key]['symbol'],
          'tokenUri': nfts['result'][key]['token_uri'],
          'metadata': nfts['result'][key]['metadata'],
          'lastTokenUriSync': nfts['result'][key]['last_token_uri_sync'],
          'lastMetadataSync': nfts['result'][key]['last_metadata_sync'],
        }
      }
      return response;
    }

    /*
    The two methods above are incomplete, I just kept them in the code because were
    also possibilities I thought. The idea is basically to get the transactions
    of a address and check the "to" and "from" attributes to find out what NFTs
    that it still owns.
    */
    if (process.env['PROVIDER'] == 'etherscan' && nftDto.contractType == 'ERC721') {
      return this.etherscanProvider.getAllERC721TransactionsToWallet(
        nftDto.wallet,
        nftDto.page
      );
    }
    if (process.env['PROVIDER'] == 'etherscan' && nftDto.contractType == 'ERC1155') {
      return this.etherscanProvider.getAllERC1155TransactionsToWallet(
        nftDto.wallet,
        nftDto.page
      );
    }
  }
}
