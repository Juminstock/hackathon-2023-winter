import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import VineMinterFactory from "./typedContract/constructors/VineMinter";
import VineMinter from "./typedContract/contracts/VineMinter";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("VineMinter test", () => {
  let VineMinterFactory: VineMinterFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  
  let contract: VineMinter;
  const initialState = true;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");

    VineMinterFactory = new VineMinterFactory(api, deployer);

    contract = new VineMinter(
      (await VineMinterFactory.new(initialState)).address,
      deployer,
      api
    );
  });

  after(async function tearDown() {
    await api.disconnect();
  });
});
