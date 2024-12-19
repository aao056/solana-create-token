"use client"
import { createToken, createTokenAcc, getTokenAcc, mint } from "../actions"

export default function Token() {
    async function createTokenButton() {
        const resp = await createToken()
        console.log(resp)
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <button className="bg-violet-200 px-3 py-3 rounded text-black" onClick={() => createTokenButton()}>Create Token</button>
            <button className="bg-violet-200 px-3 py-3 rounded text-black" onClick={() => createTokenAcc()}>Create Account</button>
            <button className="bg-violet-200 px-3 py-3 rounded text-black" onClick={() => getTokenAcc()}>Get Token</button>
            <button className="bg-violet-200 px-3 py-3 rounded text-black" onClick={() => mint()}>Mint</button>
        </main>
    )
}