export async function loadFinalProofs() {
  const res = await fetch("/final_proofs.json");
  if (!res.ok) throw new Error("Failed to load final proofs");
  return res.json();
}
