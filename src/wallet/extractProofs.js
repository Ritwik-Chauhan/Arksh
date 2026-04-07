import { PROOF_KEY_MAP } from "../config/proofMap.js";

export function extractProofs(finalProofs, required) {
  const available = finalProofs.zkp_output.proofs;
  const selected = {};

  required.forEach((proof) => {
    const mappedKey = PROOF_KEY_MAP[proof];
    if (!mappedKey || !available[mappedKey]) {
      throw new Error(`Missing proof: ${proof}`);
    }
    selected[proof] = available[mappedKey];
  });

  return selected;
}
