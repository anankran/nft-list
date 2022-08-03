import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { NFTModel } from './nft.model';
import { NFTDto } from './dto/nft.dto';
import { NFTService } from './nft.service';
import { NFTResponseDto } from './dto/nft-response.dto';

@Resolver(of => NFTModel)
export class NFTResolver {
  constructor(
    private readonly nftService: NFTService
  ) {}

  @Query(returns => NFTResponseDto)
  async getNFT(@Args() nftDto: NFTDto): Promise<NFTResponseDto> {
    const nft = await this.nftService.getNFTByProvider(nftDto);
    return nft;
  }
}