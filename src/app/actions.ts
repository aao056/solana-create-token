'use server'
import { createMint, createAccount, getAssociatedTokenAddressSync, mintTo } from "@solana/spl-token"
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js"
import fs from 'fs'

function loadKeypair(filename: string): Keypair {
    const secret = JSON.parse(fs.readFileSync(process.cwd() + '/src/app/' + filename).toString()) as number[]
    const secretKey = Uint8Array.from(secret)
    return Keypair.fromSecretKey(secretKey)
}

async function createToken() {
    try {
        console.log('You called me')
        const conn = new Connection(clusterApiUrl('devnet'))

        // Replace these with your own keys - make sure that payer has sol, if not then request an airdrop

        //  You can by running this command in the app directory: 
        //  solana-keygen grind --starts-with JA:1
        //  This will produce an JSON output file containing the private key
        //  Example JAXXXXXXXXXX.json
        //  Insert that name as the argument in the loadKeypair function
        const payer = loadKeypair('JA1R1ss4SKUg3gqQejL8DkNkVSmhQfX4e5tusq1AW3if.json')

        // Same here 
        //  solana-keygen grind --starts-with MTo:1
        const tokenKeypair = loadKeypair('MTo8aNb7c2aXWgXY4acpAS2SLdWUHHMdeHwmw5Zqfgn.json')

        const tokenMintAddress = await createMint(
            conn,
            payer,
            payer.publicKey,
            payer.publicKey,
            9,
            tokenKeypair
        )

        console.log('success', tokenMintAddress.toBase58())
        return tokenMintAddress.toBase58()
    }
    catch (err) {
        console.log(err)
    }
}

async function createTokenAcc() {
    const conn = new Connection(clusterApiUrl('devnet'))

    // Replace these with your own keys generated in createToken()
    const payer = loadKeypair("JA1R1ss4SKUg3gqQejL8DkNkVSmhQfX4e5tusq1AW3if.json")
    const tokenKeypair = loadKeypair("MTo8aNb7c2aXWgXY4acpAS2SLdWUHHMdeHwmw5Zqfgn.json")
    // const tokenAccountKeypair = loadKeypair("TAqBKAyVuWrshjxVF1fZeJCuTZWQpaG63AKD7h38QdT.json")

    const ta = await createAccount(conn, payer, tokenKeypair.publicKey, payer.publicKey)
    console.log('Account Created', ta.toBase58())
    return ta.toBase58()
}

async function getTokenAcc() {

    // Replace these with your own keys generated in createToken()
    const tokenKeypair = loadKeypair("MTo8aNb7c2aXWgXY4acpAS2SLdWUHHMdeHwmw5Zqfgn.json")
    const payer = loadKeypair("JA1R1ss4SKUg3gqQejL8DkNkVSmhQfX4e5tusq1AW3if.json")

    const ata = getAssociatedTokenAddressSync(tokenKeypair.publicKey, payer.publicKey)
    console.log(ata.toBase58())
    return ata.toBase58()
}

async function mint() {
    const conn = new Connection(clusterApiUrl('devnet'))

    // Replace these with your own keys
    const payer = loadKeypair("JA1R1ss4SKUg3gqQejL8DkNkVSmhQfX4e5tusq1AW3if.json")
    const tokenKeypair = loadKeypair("MTo8aNb7c2aXWgXY4acpAS2SLdWUHHMdeHwmw5Zqfgn.json")

    const mint = tokenKeypair.publicKey
    const ata = getAssociatedTokenAddressSync(tokenKeypair.publicKey, payer.publicKey)
    const amount = 3 * 10 ** 9;
    const sigx = await mintTo(conn, payer, mint, ata, payer.publicKey, amount)
    console.log("Minting succesfull", sigx)
    return sigx
}

export {
    createToken,
    createTokenAcc,
    getTokenAcc,
    mint
}