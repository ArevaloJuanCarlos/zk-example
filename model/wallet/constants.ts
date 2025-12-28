import { CredentialStatusType, IdentityCreationOptions } from "@0xpolygonid/js-sdk";

export const rhsUrl = process.env.EXPO_PUBLIC_RHS_URL as string;

export const defaultNetworkConnection = {
  rpcUrl: process.env.EXPO_PUBLIC_RPC_URL as string,
  contractAddress: process.env.EXPO_PUBLIC_CONTRACT_ADDRESS as string,
  chainId: parseInt(process.env.EXPO_PUBLIC_CHAIN_ID as string)
};

export const defaultIdentityCreationOptions: IdentityCreationOptions = {
  method: 'polygonid',
  blockchain: 'polygon',
  networkId: 'amoy',
  revocationOpts: {
    type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    id: rhsUrl
  }
};