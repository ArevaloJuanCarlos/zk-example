import { defaultIdentityCreationOptions, defaultNetworkConnection } from "./constants";
import { initInMemoryDataStorageAndWallets } from "./walletSetup";

export async function identityCreation() {
  try {
    console.log('=============== key creation ===============');
    const { identityWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);
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