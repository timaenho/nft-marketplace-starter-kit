// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
    /*
    building out the minting function:
        a. nft to point to an address
        b. keep track of the token ids
        c. keep track of token owner addresses to token ids
        d. keep track of how many tokens an owner address has
        e. create an event that emits a transfer log - contract address, where it is being minted to, id
    */

contract ERC721 {
    //to see logs in the console
    event Transfer (
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    //mapping in solidity creates a hash table of key pair values
    //mapping from token id to the owner
    mapping(uint => address) private _tokenOwner;

    //mapping from owner to number of owned tokens
    mapping(address => uint) private _OwnedTokensCount;



    //to get the balance:
    //b1 = await kryptoBird.balanceOf('address')
    //b1.words[0]
    function balanceOf(address owner) public view returns (uint256){
        require(owner != address(0), "Error balanceOf - owner address is a 0 address");
        return _OwnedTokensCount[owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "Error ownerOf - owner address is a 0 address");
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns (bool){
        address owner = _tokenOwner[tokenId];
        return owner != address(0); //check if the address is not 0
    }

    //virtual because we override this function in de ERC721Enumerable contract
    function _mint (address to, uint256 tokenId) internal virtual {
        // requires that the address isn't zero
        require(to != address(0), "ERC721: minting to the zero address");
        // requires that the token does not already exists
        require(!_exists(tokenId), "ERC721: token already minted");
        // we are adding a new address with a token id for minting
        _tokenOwner[tokenId] = to;
        // keeping track of each address that is minting and adding one
        _OwnedTokensCount[to]+=1;
        
        emit Transfer(address(0), to, tokenId);
    }



    }