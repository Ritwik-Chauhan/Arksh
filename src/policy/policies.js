export const POLICIES = {
  buy_sim: {
    description: "Purchase a mobile SIM card",
    regulator: "DoT",
    required_proofs: ["name","age_over_18", "citizenship_india", "identity_verified"]
  },
  open_bank_account: {
    description: "Open a bank account",
    regulator: "RBI",
    required_proofs: ["name","age_over_18", "citizenship_india", "address_verified", "identity_verified"]
  },
  buy_alcohol: {
    description: "Purchase alcohol",
    regulator: "State Government",
    required_proofs: ["name", "age_over_21"]
  },
  apply_credit_card: {
    description: "Apply for a credit card",
    regulator: "RBI",
    required_proofs: ["name", "age_over_18", "citizenship_india", "income_verified", "pan_verified"]
  },
  apply_loan: {
    description: "Apply for a loan",
    regulator: "RBI",
    required_proofs: ["name", "age_over_18", "citizenship_india", "address_verified", "pan_verified"]
  },
  open_crypto_exchange_account: {
    description: "Open crypto exchange account",
    regulator: "FIU-IND",
    required_proofs: ["name", "age_over_18", "citizenship_india", "identity_verified", "pan_verified"]
  }
};
