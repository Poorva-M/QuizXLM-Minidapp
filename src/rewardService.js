// import {
//   Horizon,
//   Keypair,
//   TransactionBuilder,
//   Operation,
//   Asset,
//   Networks,
//   BASE_FEE,
//   Memo,
// } from "@stellar/stellar-sdk";

// const HORIZON_URL = "https://horizon-testnet.stellar.org";
// const NETWORK_PASSPHRASE = Networks.TESTNET;
// const REWARD_PER_CORRECT = 10; // XLM per correct answer

// // ── ADMIN ACCOUNT ──
// // This is a funded testnet account that pays out rewards.
// // Get free testnet XLM at: https://friendbot.stellar.org
// // Replace with your own funded testnet keypair.
// const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;
// const ADMIN_PUBLIC  = import.meta.env.VITE_ADMIN_PUBLIC;

// const server = new Horizon.Server(HORIZON_URL);

// /**
//  * Send XLM reward to a player after quiz
//  * @param {string} playerPublicKey - player's Stellar address
//  * @param {number} correctAnswers  - number of correct answers
//  */
// export const sendReward = async (playerPublicKey, correctAnswers) => {
//   if (!playerPublicKey) {
//     return { success: false, message: "No wallet connected." };
//   }

//   if (correctAnswers === 0) {
//     return { success: false, message: "No correct answers — no reward sent." };
//   }

//   const rewardAmount = (correctAnswers * REWARD_PER_CORRECT).toFixed(2);

//   try {
//     const adminKeypair = Keypair.fromSecret(ADMIN_SECRET);
//     const adminAccount = await server.loadAccount(ADMIN_PUBLIC);

//     const transaction = new TransactionBuilder(adminAccount, {
//       fee: BASE_FEE,
//       networkPassphrase: NETWORK_PASSPHRASE,
//     })
//       .addOperation(
//         Operation.payment({
//           destination: playerPublicKey,
//           asset: Asset.native(),
//           amount: rewardAmount,
//         })
//       )
//       .addMemo(Memo.text(`QuizXLM reward`))
//       .setTimeout(30)
//       .build();

//     transaction.sign(adminKeypair);

//     const result = await server.submitTransaction(transaction);

//     return {
//       success: true,
//       txHash: result.hash,
//       rewardAmount,
//       explorerUrl: `https://stellar.expert/explorer/testnet/tx/${result.hash}`,
//     };
//   } catch (error) {
//     const code =
//       error?.response?.data?.extras?.result_codes?.operations?.[0] ||
//       error?.response?.data?.extras?.result_codes?.transaction ||
//       error?.message ||
//       "Unknown error";

//     return { success: false, message: code };
//   }
// };

// /**
//  * Fetch XLM balance of any Stellar account
//  * @param {string} publicKey
//  */
// export const fetchBalance = async (publicKey) => {
//   try {
//     const account = await server.loadAccount(publicKey);
//     const xlm = account.balances.find((b) => b.asset_type === "native");
//     return xlm ? parseFloat(xlm.balance).toFixed(2) : "0.00";
//   } catch {
//     return "0.00";
//   }
// };


/**
 * rewardService.js
 * 
 * Re-exports all contract functions from the contracts folder.
 * This keeps the contract logic centralized in /contracts/QuizRewardContract.js
 */

export {
  sendReward,
  calculateReward,
  hasPlayedToday,
  markPlayedToday,
  getBalance as fetchBalance,
  CONTRACT_CONFIG,
} from "../src/contracts/QuizRewardContract";

export {
  CONTRACT_CONFIG as default,
} from "../src/contracts/QuizRewardContract";