// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "../node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
contract ASSETS is ERC721PresetMinterPauserAutoId {
    constructor()
    ERC721PresetMinterPauserAutoId("MyNFTAssets", "MNA", "https://a721-61-228-139-71.jp.ngrok.io/meta/")
    {}
}