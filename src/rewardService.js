// rewardService.js
// Fixed import path: was "../src/contracts/..." but should be "./contracts/..."

export {
  sendReward,
  calculateReward,
  hasPlayedToday,
  markPlayedToday,
  getBalance as fetchBalance,
  CONTRACT_CONFIG,
} from "./contracts/QuizRewardContract";

export { CONTRACT_CONFIG as default } from "./contracts/QuizRewardContract";