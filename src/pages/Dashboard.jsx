// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Account from "./Account";
import { getAccounts, createAccount } from "../api/accounts";
import {getBeneficiaries, createBeneficiary, deleteBeneficiary,} from "../api/beneficiaries";
import AccountsSection from "../components/dashboard/AccountsSection";
import BeneficiariesSection from "../components/dashboard/BeneficiariesSection";

export default function Dashboard() {
  const { isConnected } = useAuth();

  // accounts state
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState("");

  // beneficiaries state
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiariesLoading, setBeneficiariesLoading] = useState(false);
  const [beneficiariesError, setBeneficiariesError] = useState("");

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Load accounts from API
  useEffect(() => {
    if (!isConnected) return;

    async function loadAccounts() {
      setAccountsLoading(true);
      setAccountsError("");
      try {
        const data = await getAccounts();
        const mapped = (data || []).map((a) => ({
          id: a.iban || a.id,
          name: a.name || a.iban || "Compte",
          iban: a.iban,
          balance: Number(a.balance ?? 0),
          is_primary: Boolean(a.is_primary ?? a.isPrimary),
        }));
        setAccounts(mapped);
      } catch (err) {
        console.error("getAccounts error:", err);
        setAccountsError(err.message || "Cannot load accounts");
      } finally {
        setAccountsLoading(false);
      }
    }

    loadAccounts();
  }, [isConnected]);

  // Load beneficiaries from API
  useEffect(() => {
    if (!isConnected) return;

    async function loadBeneficiaries() {
      setBeneficiariesLoading(true);
      setBeneficiariesError("");
      try {
        const data = await getBeneficiaries();
        setBeneficiaries(data || []);
      } catch (err) {
        console.error("getBeneficiaries error:", err);
        setBeneficiariesError(err.message || "Cannot load beneficiaries");
      } finally {
        setBeneficiariesLoading(false);
      }
    }

    loadBeneficiaries();
  }, [isConnected]);

  // Create a new account (primary or secondary)
  const handleCreateAccount = async (isPrimary = false, name = null) => {
    try {
      setCreatingAccount(true);
      setAccountsError("");
      const acc = await createAccount({ is_primary: isPrimary, name });

      const newAcc = {
        id: acc.iban || acc.id,
        name: acc.name || acc.iban || "Compte",
        iban: acc.iban,
        balance: Number(acc.balance ?? 0),
        is_primary: Boolean(acc.is_primary ?? acc.isPrimary),
      };

      setAccounts((prev) => {
        if (newAcc.is_primary) {
          const others = prev.map((p) => ({ ...p, is_primary: false }));
          return [newAcc, ...others];
        }
        return [...prev, newAcc];
      });
    } catch (err) {
      console.error("createAccount error:", err);
      setAccountsError(err.message || "Cannot create account");
    } finally {
      setCreatingAccount(false);
    }
  };

  // Add beneficiary 
  const handleAddBeneficiary = async (payload) => {
    if (!payload || (!payload.name && !payload.iban)) return;
    setBeneficiariesError("");
    try {
      const created = await createBeneficiary({ name: payload.name, iban: payload.iban });
      setBeneficiaries((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error("createBeneficiary error:", err);
      const message = err.message || "Cannot create beneficiary";
      setBeneficiariesError(message);
      throw err;
    }
  };

  // Delete beneficiary
  const handleDeleteBeneficiary = async (id) => {
    const ok = window.confirm("Delete this beneficiary ?");
    if (!ok) return;

    try {
      await deleteBeneficiary(id);
      setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("deleteBeneficiary error:", err);
      alert(err.message || "Cannot delete beneficiary");
    }
  };

  // If an account is selected, show the Account page
  if (selectedAccount) {
    return (
      <Account
        account={selectedAccount}
        onBack={(deletedIban) => {
        setSelectedAccount(null);

      if (deletedIban) {
        setAccounts((prev) => prev.filter((a) => a.iban !== deletedIban));
    }
  }}
/>

    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold mb-2">Tableau de bord</h1>
      <p className="text-text-muted mb-6">
        Vos comptes — et vos bénéficiaires.
      </p>

      <AccountsSection
        accounts={accounts}
        loading={accountsLoading}
        error={accountsError}
        creating={creatingAccount}
        onCreateAccount={handleCreateAccount}
        onSelectAccount={setSelectedAccount}
      />

      <BeneficiariesSection
        className="mt-8"
        beneficiaries={beneficiaries}
        loading={beneficiariesLoading}
        error={beneficiariesError}
        onAddBeneficiary={handleAddBeneficiary}
        onDeleteBeneficiary={handleDeleteBeneficiary}
      />
    </section>
  );
}
