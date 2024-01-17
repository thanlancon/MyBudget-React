const urlHome = '/';
const pathHome = urlHome;
const getHomeURL = () => (urlHome)

const urlBanks = '/banks';
const pathBanks = urlBanks;

const urlBankAccounts = '/bankaccounts';
const pathBankAccounts = urlBankAccounts;
const getBankAccountURL=()=>(urlBankAccounts);

const urlBankAccountTypes = '/bankaccounttypes';
const pathBankAccountTypes = urlBankAccountTypes;

const urlCategories = '/categories';
const pathCategories = urlCategories;

const urlEnvelopes = '/envelopes';
const pathEnvelopes = urlEnvelopes;
const getEnvelopeURL=()=>(urlEnvelopes);

const urlPayees = '/payees';
const pathPayees = urlPayees;

const paramBankID = 'bankid';
const urlTransactions = '/transactions/bank';
const pathTransactions = `${urlTransactions}/:${paramBankID}`;
const getTransactionURL=(bankid:string)=>{
    return `${urlTransactions}/${bankid}`;
}
const paramTransactionID = 'transactionid';
const urlTransactionDetail = '/transaction';
const pathTransactionDetail = `${urlTransactionDetail}/:${paramTransactionID}`;
const getTransactionDetailURL=(transactionid:string)=>{
    return `${urlTransactionDetail}/${transactionid}`;
}

const urlEnvelopEdit = `/envelope/edit`;
const pathEndvelopeEdit = urlEnvelopEdit;
const getEnvelopeEditURL = () => { return urlEnvelopEdit };

export const RouterURL = {
    pathBanks,
    pathBankAccountTypes,
    pathCategories,
    pathEnvelopes,
    pathPayees,
    pathTransactions,
    pathEndvelopeEdit,
    pathHome,
    pathBankAccounts,
    pathTransactionDetail,
    getBankAccountURL,
    getHomeURL,
    getEnvelopeEditURL,
    getEnvelopeURL,
    getTransactionURL,
    getTransactionDetailURL
};
