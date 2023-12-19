export const ServerResponseStatus = {
    Success: 200
}
const ResponseConstants = {
    //update success
    UpdateSuccess: "Update Success",
    Transaction: {
        //all the infor in transaction is valid
        isValid: "VALID",
        TransactionIsUpdateAble: "Transaction is updateable",
        //Bank is not selected
        BankNotSelected: "Bank is not selected",
        //Transaction has the same Bank Name and Bank Tranfer Name
        DoubleBankName: "Double Bank Names",
        //Both Inflow and Outflow equal 0
        ZeroTransaction: "Inflow and Outflow equal 0",
        //Either Inflow or Outflow must be 0
        MustHasAZero: "Inflow or Outflow must be 0",
        //TransactionDate is after PostDate
        TransactionDateAfterPostDate: "Post Date must be nothing or AFTER Transaction Date",
        //If bank account are change when editting
        BankExist: "Cannot change bank(s) account",

        BothBanksWithEnvelope: "Cannot select envelope and payee when both bank and bank transfer are selected.",
        BankTransferNoPayeeEnvelope: "Do NOT select payee or envelope for bank transfer transaction.",

        CannotChangeBank: "Bank must not be changed.",
        CannotChangeBankTransfer: "Bank transfer must not be changed.",
        CannotChangeEnvelope: "Envelope must not be changed.",
        BankSameTransfer: "Bank and Bank Transfer cannot be the same",

        FailToLoadBeforeEdit: "Cannot load transaction before edit.",

        FailToLoadTransfer: "Cannot load transfer transaction.",
        FailToCreateTransfer: "Cannot create transfer transaction.",
        FailToUpdateFollowingBalance: "Cannot update balance for following transactions.",
        FailToUpdateFollowingTransferBalance: "Cannot update balance for following transactions of the transfer transaction.",
        FailToUpdateBankBalance: "Cannot update bank balance.",
        FailToUpdateBankBalanceTransfer: "Cannot update bank balance of the transfer transaction.",
        FailToUpdateEnvelopeBalance: "Cannot update envelope balance.",
        FailToUpdateEnvelopeBalanceTransfer: "Cannot update envelope balance of the transfer transaction.",

    },
    Payee: {
        PayeeNotFound: 'Payee not found!'
    },
    Envelope: {
        NotFound: 'Envelope is not found!'
    }
};
export default ResponseConstants;
