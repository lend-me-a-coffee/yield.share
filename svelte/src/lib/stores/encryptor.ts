import crypto from "crypto";
import CryptoJS from "crypto-js";

const algorithm = "aes-256-cbc";
// generate key with crypto.randomBytes(256/8).toString('hex')
// const key = "6d858102402dbbeb0f9bb711e3d13a1229684792db4940db0d0e71c08ca602e1";
const IV_LENGTH = 16;

export const encrypt = (text: string, key: string) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (text: string, key: string) => {
    const [iv, encryptedText] = text.split(":").map(part => Buffer.from(part, "hex"));
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export const encryptJs = (text: string, key: string) => {
    const encriptkey = CryptoJS.enc.Hex.parse(key);

    const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

    const encrypted = CryptoJS.AES.encrypt("Message", encriptkey, { iv: iv });

    return encrypted.toString();
}
