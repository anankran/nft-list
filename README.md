## List NFT on GraphQL

You need to generate a <b>.env</b> file baded on the example. A <b>Moralis API Key</b> is required.

Run using Docker:
```
docker-compose build
docker-compose up
```

List the NFT using the following query:
```
{
  getNFT(
    wallet: "",
    contractType: "" (can be ERC721 or ERC1155),
    page: 1
  ) {
    total
    page
    nfts {
      ...
    }
  }
}
```

To check the GraphQL schemas, access `http://localhost:3000/graphql`.
