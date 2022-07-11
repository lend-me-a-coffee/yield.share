<script lang="ts">
    import { Container } from "sveltestrap";
    import { encryptJs } from "../stores/encryptor";
    import sigUtil from "@metamask/eth-sig-util";
    import ethUtil from "ethereumjs-util";
    let text: string;
    let decrypted: string;

    async function encrypt() {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("addres is", account[0]);
        const key = await window.ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: [account[0]],
        });
        console.log("About to encrypt", text, key);
        const result = encryptJs(text, key);
        console.log("encrypted", result);
        decrypted = result;
    }

    async function fancyEncrypt() {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("addres is", account[0]);
        const key = await window.ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: [account[0]],
        });

        const message = ethUtil.bufferToHex(
            Buffer.from(
                JSON.stringify(
                    sigUtil.encrypt({
                        publicKey: key,
                        data: text,
                        version: "x25519-xsalsa20-poly1305",
                    })
                ),
                "utf8"
            )
        );

        decrypted = message;
    }

    async function decrypt(text: string) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const decrypt = await window.ethereum.request({
            method: "eth_decrypt",
            params: [text, account[0]],
        });
        console.log(decrypt);
        return decrypt;
    }

    async function decryptMessage() {
        const decro = await decrypt(decrypted);
        decrypted = decro;
    }
</script>

<Container>
    <div class="encryptor">
        <input type="text" bind:value={text} />
        <p>Encrypt {text}</p>

        <button on:click={() => fancyEncrypt()}>Encrypt</button>
        <br />
        <input type="text" bind:value={decrypted} disabled />

        <button on:click={() => decryptMessage()}>Decrypt</button>
    </div>
</Container>

<style>
    .encryptor {
        padding: 50px;
    }
</style>
