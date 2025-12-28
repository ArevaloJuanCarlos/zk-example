import { CircuitId, CredentialRequest, CredentialStatusType, ZeroKnowledgeProofRequest } from "@0xpolygonid/js-sdk";
import { DID } from "@iden3/js-iden3-core";
import { fetch } from 'expo/fetch';

import { defaultIdentityCreationOptions, defaultNetworkConnection, rhsUrl } from "./constants";
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
  console.log('================= initialize wallets and services ===================');
  const { identityWallet, dataStorage, credentialWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);
  const circuitStorage = await initCircuitStorage();
  const proofService = await initProofService(identityWallet, credentialWallet, dataStorage.states, circuitStorage);
  /*
  const proofRequestParsed = JSON.parse(proofRequest);
  const did = DID.parse(userVC.did);
  const credential = W3CCredential.fromJSON(userVC.vc);
  */

  console.log('================= create identities and issue credential ===================');
  const { did: userDID, credential: authBJJCredentialUser } = await identityWallet.createIdentity({
    ...defaultIdentityCreationOptions
  });

  console.log('=============== user did ===============');
  console.log(userDID.string());

  const { did: issuerDID, credential: issuerAuthBJJCredential } =
    await identityWallet.createIdentity({ ...defaultIdentityCreationOptions });

  const credentialRequest = createKYCAgeCredential(userDID);
  console.log('=============== credentialRequest ===============');
  console.log(credentialRequest);
  const credential = await identityWallet.issueCredential(issuerDID, credentialRequest);

  console.log('=============== credential ===============');
  console.log(credential);

  await dataStorage.credential.saveCredential(credential);

  console.log('=============== save credential in memory ===============');
  await dataStorage.identity.saveIdentity({
    did: userVC.did,
  })
  await dataStorage.credential.saveCredential(credential);

  console.log('================= generate Iden3SparseMerkleTreeProof =======================');

  const res = await identityWallet.addCredentialsToMerkleTree([credential], issuerDID);

  console.log('================= push states to rhs ===================');

  await identityWallet.publishRevocationInfoByCredentialStatusType(
    issuerDID,
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    { rhsUrl }
  );

  console.log('================= generate credentialAtomicSigV2 ===================');

  const proofReqSig: ZeroKnowledgeProofRequest = createKYCAgeCredentialRequest(
    CircuitId.AtomicQuerySigV2,
    credentialRequest
  );

  const { proof, pub_signals } = await proofService.generateProof(proofReqSig, userDID, {
    skipRevocation: true,
    credential,
  });


  console.log('================= verify proof ===================');
  const sigProofOk = await proofService.verifyProof(
    { proof, pub_signals },
    CircuitId.AtomicQuerySigV2
  );
  console.log('valid: ', sigProofOk);
}


function createKYCAgeCredential(did: DID) {
  const credentialRequest: CredentialRequest = {
    credentialSchema:
      'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
    type: 'KYCAgeCredential',
    credentialSubject: {
      id: did.string(),
      birthday: 19960424,
      documentType: 99
    },
    expiration: 12345678888,
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: rhsUrl
    }
  };
  return credentialRequest;
}

function createKYCAgeCredentialRequest(
  circuitId: CircuitId,
  credentialRequest: CredentialRequest
): ZeroKnowledgeProofRequest {
  const proofReqSig: ZeroKnowledgeProofRequest = {
    id: 1,
    circuitId: CircuitId.AtomicQuerySigV2,
    optional: false,
    query: {
      allowedIssuers: ['*'],
      type: credentialRequest.type,
      context:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
      credentialSubject: {
        documentType: {
          $eq: 99
        }
      }
    }
  };

  const proofReqMtp: ZeroKnowledgeProofRequest = {
    id: 1,
    circuitId: CircuitId.AtomicQueryMTPV2,
    optional: false,
    query: {
      allowedIssuers: ['*'],
      type: credentialRequest.type,
      context:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
      credentialSubject: {
        birthday: {
          $lt: 20020101
        }
      }
    }
  };

  switch (circuitId) {
    case CircuitId.AtomicQuerySigV2:
      return proofReqSig;
    case CircuitId.AtomicQueryMTPV2:
      return proofReqMtp;
    default:
      return proofReqSig;
  }
}