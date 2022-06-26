import Web3Modal from "web3modal";
import { providerOptions } from "../config/providerOptions";

export const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});