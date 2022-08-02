import { Controller, Get, Param } from '@nestjs/common';
import { NFTService } from './nft.service';
import { NFTDto } from './dto/nft.dto';

@Controller()
export class NFTController {
  constructor(private readonly nftService: NFTService) {}

  @Get('nft/:wallet/:contractType')
  getNFT(@Param('') nftDto: NFTDto) {
    return this.nftService.getNFTByProvider(nftDto);
  }
}
