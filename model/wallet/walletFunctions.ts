import { W3CCredential, ZeroKnowledgeProofRequest } from "@0xpolygonid/js-sdk";
import { DID } from "@iden3/js-iden3-core";
import { fetch } from 'expo/fetch';

import { defaultIdentityCreationOptions, defaultNetworkConnection } from "./constants";
import { userVC } from "./vc";
import { initCircuitStorage, initInMemoryDataStorageAndWallets, initProofService } from "./walletSetup";

export async function identityCreation() {
  try {
    const { identityWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);

    console.log('=============== key creation ===============');
    const { did, credential } = await identityWallet.createIdentity({
      ...defaultIdentityCreationOptions
    });

    console.log('=============== did ===============');
    console.log(did.string());
    console.log('=============== Auth BJJ credential ===============');
    console.log(JSON.stringify(credential));
  } catch (error) {
    console.error('Error during identity creation:', error);
  }
}

export async function signIn() {
  const response = await fetch(process.env.EXPO_PUBLIC_VERIFIER + "/zk-auth/request");

  if (!response.ok) {
    console.error('Failed to fetch proof request:', response.statusText);
    return;
  }

  const proofRequest = await response.text();
  await generateProof(proofRequest);
}

export async function generateProof(proofRequest: string) {
  const { identityWallet, dataStorage, credentialWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);
  const circuitStorage = await initCircuitStorage();
  
  const proofRequestParsed = JSON.parse(proofRequest);
  const did = DID.parse(userVC.did);
  const credential = W3CCredential.fromJSON(userVC.vc);

  console.log('=============== load credential ===============');
  dataStorage.identity.saveIdentity({
    did: userVC.did,
    isStateGenesis: true,
    isStatePublished: false,
  })

  console.log('=============== key creation ===============');
  const proofService = await initProofService(identityWallet, credentialWallet, dataStorage.states, circuitStorage);

  console.log('=============== proof generation ===============');  
  const proofReqSig: ZeroKnowledgeProofRequest = {
    optional: false,
    ...proofRequestParsed.body.scope[0]
  };

  const { proof, pub_signals } = await proofService.generateProof(
    proofReqSig,
    did,
    {
      skipRevocation: true,
      credential,
    }
  )

  console.log('=============== proof ===============');
  console.log(JSON.stringify(proof));
  console.log('=============== public signals ===============');
  console.log(JSON.stringify(pub_signals));
}