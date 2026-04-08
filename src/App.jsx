import { useState } from "react";

import finalProofs from "./data/finalProofs.json";
import { POLICIES } from "./policy/policies.js";
import { PROOF_KEY_MAP } from "./config/proofMap.js";
import { PROOF_TO_RAW_FIELD } from "./config/proofToRawField.js";

import "./App.css";

function App() {
  const [enter, setEnter] = useState(false);

  const [mode, setMode] = useState("user");
  const [selectedService, setSelectedService] = useState(null);
  const [rawInputs, setRawInputs] = useState({});
  const [zkpResults, setZkpResults] = useState(null);

  // ✅ NEW STATE
  const [submittedRawData, setSubmittedRawData] = useState(null);

  function getRequiredRawFields(serviceKey) {
    const proofs = POLICIES[serviceKey].required_proofs;
    const fields = new Set();

    proofs.forEach((proof) => {
      const field = PROOF_TO_RAW_FIELD[proof];
      if (field) fields.add(field);
    });
 fields.add("name");
    return Array.from(fields);
  }

  function handleGenerateProofs() {
    const results = {};

    POLICIES[selectedService].required_proofs.forEach((proof) => {
      const zkpKey = PROOF_KEY_MAP[proof];
      results[proof] = finalProofs.zkp_output.results[zkpKey];
    });

    setZkpResults(results);
  }

  // ✅ NEW FUNCTION
  function handleSubmitRawData() {
    setSubmittedRawData({
      service: selectedService,
      data: rawInputs,
      time: new Date().toLocaleString(),
    });
  }

  return (
    <>
      {!enter && (
        <div className="landing-overlay">
          <div className="landing-box">
            <h1>Arksh:Privacy-Preserving System</h1>

            <p>
              A next-generation KYC system built using <b>Zero-Knowledge Proofs (ZKP)</b>,
              enabling users to verify eligibility without revealing sensitive personal data.
            </p>

            <p>
              Designed in alignment with India's <b>DPDP Act</b>, ensuring privacy,
              security, and user control in digital identity verification.
            </p>

            <ul>
              <li>🔒 Eliminates unnecessary data sharing</li>
              <li>🛡️ Protects against data breaches & identity theft</li>
              <li>📜 Ensures DPDP compliance</li>
              <li>👤 Full user control over personal data</li>
            </ul>

            <h3>How It Works</h3>
            <ul>
              <li>✔ User generates cryptographic proof</li>
              <li>✔ Verifier validates proof</li>
              <li>✔ No raw data is exposed</li>
            </ul>

            <h3>Example</h3>
            <ul>
              <li>✔ Prove age &gt; 18 without DOB</li>
              <li>✔ Prove valid identity exists</li>
            </ul>

            <button
              className="enter-btn-landing"
              onClick={() => setEnter(true)}
            >
              Enter Secure Wallet →
            </button>
          </div>
        </div>
      )}

      <div className="app-container">
        <div className="header">
          <h1>Privacy Preserving ZKP System</h1>
          <p>Zero-Knowledge Proof based identity verification.</p>
          <p>In compliance with India's DPDP Act-2023</p>

          <button
            className="secondary-btn"
            style={{ marginTop: "2rem" }}
            onClick={() =>
              setMode(mode === "user" ? "company" : "user")
            }
          >
            Switch to {mode === "user" ? "Company Panel" : "User Wallet"}
          </button>
        </div>

        {mode === "user" && (
          <>
            <div className="card">
              <h2 className="section-title">Select Service</h2>
              <div className="service-buttons">
                {Object.keys(POLICIES).map((service) => (
                  <button
                    key={service}
                    className={`service-button ${
                      selectedService === service ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedService(service);
                      setRawInputs({});
                      setZkpResults(null);
                      setSubmittedRawData(null); // ✅ FIX RESET
                    }}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {selectedService && (
              <div className="card">
                <h3 className="section-title">
                  Enter Raw Data (Wallet Side)
                </h3>

                <div className="grid-2">
                  {getRequiredRawFields(selectedService).map((field) => (
                    <div className="input-group" key={field}>
                      <label>{field} (Private)</label>
                      <input
                        type="text"
                        value={rawInputs[field] || ""}
                        onChange={(e) =>
                          setRawInputs({
                            ...rawInputs,
                            [field]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* ✅ Submit Raw Data */}
                <button
                  className="secondary-btn"
                  style={{ marginRight: "1rem" }}
                  onClick={handleSubmitRawData}
                >
                  Submit Raw Data
                </button>

                <button className="primary-btn" onClick={handleGenerateProofs}>
                  Generate Zero-Knowledge Proofs
                </button>
              </div>
            )}

            {zkpResults && (
              <div className="card">
                <h3 className="section-title">ZKP Proof Results</h3>
                <ul className="proof-list">
                  {Object.entries(zkpResults).map(([proof, value]) => (
                    <li key={proof} className="proof-item">
                      <span>{proof}</span>
                      <span>{String(value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {mode === "company" && (
          <div className="card">
            <h2 className="section-title">Company Panel</h2>

            {submittedRawData && (
              <>
                <p>
  <strong>Service:</strong>{" "}
  {POLICIES[submittedRawData.service]?.name}
</p>
                <p><strong>Time:</strong> {submittedRawData.time}</p>

                <h4>Raw Data Received</h4>
                <ul className="proof-list">
                  {Object.entries(submittedRawData.data).map(([key, value]) => (
                    <li key={key} className="proof-item">
                      <span>{key}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!zkpResults ? (
              <p>No proofs received yet.</p>
            ) : (
              <>
                <p><strong>Status:</strong> ✅ Received</p>
                <p><strong>Verification:</strong> ✅ Valid</p>

                <ul className="proof-list">
                  {Object.entries(zkpResults).map(([proof]) => (
                    <li key={proof} className="proof-item">
                      <span>{proof}</span>
                      <span>✅ Satisfied</span>
                    </li>
                  ))}
                </ul>

                <p style={{ color: "green", fontWeight: "bold" }}>
                  APPROVED
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;