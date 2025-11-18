import React from "react";

function AccountItem({ account }) {
  return (
    <div className="account-item">
      <h3>{account.type}</h3>
      <p>ID : {account.id}</p>
      <p>Solde : {account.balance.toFixed(2)} €</p>

      <div className="account-links">
        <a href={`/account/${account.id}`}>Détail</a>
      </div>
    </div>
  );
}

export default AccountItem;
