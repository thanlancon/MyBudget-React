const urlBanks = '/banks';
const pathBanks = urlBanks;

const urlBankAccountTypes = '/bankaccounttypes';
const pathBankAccountTypes = urlBankAccountTypes;

const urlCategories = '/categories';
const pathCategories = urlCategories;

const urlEnvelopes = '/envelopes';
const pathEnvelopes = urlEnvelopes;

const urlPayees = '/payees';
const pathPayees = urlPayees;

const paramBankID = 'bankid';
const urlTransactions = `/transactions/bank/:${paramBankID}`;
const pathTransactions = urlTransactions;

export const RouterURL = {
    pathBanks,
    pathBankAccountTypes,
    pathCategories,
    pathEnvelopes,
    pathPayees,
    pathTransactions
};
