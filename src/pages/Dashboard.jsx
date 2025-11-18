import React from "react";
import { user, accounts, history } from "../data/mockData";
import UserInfo from "../components/UserInfo";
import AccountList from "../components/AccountList";
import HistoryList from "../components/HistoryList";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl space-y-8">

        {/* USER CARD */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <UserInfo user={user} />
        </div>

        {/* BUTTON NEW ACCOUNT */}
        <div className="flex justify-end">
          <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
            ➕ Ouvrir un nouveau compte
          </button>
        </div>

        {/* ACCOUNTS */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <AccountList accounts={accounts} />
        </div>

        {/* HISTORY */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <HistoryList history={history} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
