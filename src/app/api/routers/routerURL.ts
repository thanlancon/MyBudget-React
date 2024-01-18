
const urlHome = '/';
const pathHome = urlHome;
const getHomeURL = () => (urlHome)

const urlBanks = '/banks';
const pathBanks = urlBanks;

const urlBankAccounts = '/bankaccounts';
const pathBankAccounts = urlBankAccounts;
const getBankAccountURL = () => (urlBankAccounts);

const urlBankAccountTypes = '/bankaccounttypes';
const pathBankAccountTypes = urlBankAccountTypes;

const urlCategories = '/categories';
const pathCategories = urlCategories;

const urlEnvelopes = '/envelopes';
const pathEnvelopes = urlEnvelopes;
const getEnvelopeURL = () => (urlEnvelopes);

const urlPayees = '/payees';
const pathPayees = urlPayees;

const paramBankID = 'bankid';
const paramBankCode = 'bankcode';
const urlTransactions = '/transactions';
const pathTransactions = `${urlTransactions}/:${paramBankID}/:${paramBankCode}`;
const getTransactionsURL = (bankid: string, bankcode: string) => {
    return `${urlTransactions}/${bankid}/${bankcode}`;
}
const paramTransactionID = 'transactionid';
const urlTransactionDetail = '/transaction';
const pathTransactionDetail = `${urlTransactionDetail}/:${paramTransactionID}`;
const getTransactionDetailURL = (transactionid: string) => {
    return `${urlTransactionDetail}/${transactionid}`;
}
const urlNewTransaction = '/newtran';
const pathNewTransaction = urlNewTransaction;
const getNewTransactionURL = () => (urlNewTransaction)

const urlEnvelopDetail = `/envelope/edit`;
const pathEnvelopeDetail = urlEnvelopDetail;
const getEnvelopeEditURL = () => { return urlEnvelopDetail };

export const RouterURL = {
    pathBanks,
    pathBankAccountTypes,
    pathCategories,
    pathEnvelopes,
    pathPayees,
    pathTransactions,
    pathEnvelopeDetail,
    pathHome,
    pathBankAccounts,
    pathTransactionDetail,
    pathNewTransaction,
    getBankAccountURL,
    getHomeURL,
    getEnvelopeEditURL,
    getEnvelopeURL,
    getTransactionsURL,
    getTransactionDetailURL,
    getNewTransactionURL
};
