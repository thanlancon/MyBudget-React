import { makeAutoObservable } from "mobx";
import { NIL as NIL_UUID } from "uuid";

export class MainDaskBoardStore {
    isBankDashBoardActive = false;
    isBankAccountTypeDashBoardActive = false;
    isBankAccountDashBoardActive = false;
    isBankAccountQuickViewActive = true;
    isCategoryDashBoardActive = false;
    isEnvelopeDashBoardActive = true;
    isPayeeDashBoardActive = false;
    isTransactionDashBoardActive = false;
    isBankAccountFormActive = false;

    selectedBankID = NIL_UUID;
    selectedBankCode = '';
    constructor() {
        makeAutoObservable(this);
    }

    setSelectedBank = (bankID = NIL_UUID, bankCode = '') => {
        this.selectedBankID = bankID;
        this.selectedBankCode = bankCode;
    }
    showBankDashBoard = () => {
        this.isBankDashBoardActive = true;

        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = false;

        this.isCategoryDashBoardActive = false;
        this.isEnvelopeDashBoardActive = false;
        this.isPayeeDashBoardActive = false;
        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    };
    showBankAccountTypeDashBoard = () => {
        this.isBankDashBoardActive = false;

        this.isBankAccountTypeDashBoardActive = true;

        this.isBankAccountDashBoardActive = false;
        this.isCategoryDashBoardActive = false;
        this.isEnvelopeDashBoardActive = false;
        this.isPayeeDashBoardActive = false;
        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    }
    showBankAccountDashBoard = () => {

        this.isBankAccountDashBoardActive = true;

    }
    showCategoryDashBoard = () => {
        this.isBankDashBoardActive = false;
        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = false;

        this.isCategoryDashBoardActive = true;

        this.isEnvelopeDashBoardActive = false;
        this.isPayeeDashBoardActive = false;
        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    }
    showEnvelopeDashBoard = () => {
        this.isBankDashBoardActive = false;
        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = false;
        this.isCategoryDashBoardActive = false;

        this.isEnvelopeDashBoardActive = true;

        this.isPayeeDashBoardActive = false;
        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    }
    showPayeeDashBoard = () => {
        this.isBankDashBoardActive = false;
        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = false;
        this.isCategoryDashBoardActive = false;
        this.isEnvelopeDashBoardActive = false;

        this.isPayeeDashBoardActive = true;

        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    }
    showTransactionDashBoard = () => {
        this.isBankDashBoardActive = false;
        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = false;
        this.isCategoryDashBoardActive = false;
        this.isEnvelopeDashBoardActive = false;
        this.isPayeeDashBoardActive = false;

        this.isTransactionDashBoardActive = true;
        this.isBankAccountFormActive = false;
    }
    showBankAccountForm = () => {
        this.isBankDashBoardActive = false;
        this.isBankAccountTypeDashBoardActive = false;
        this.isBankAccountDashBoardActive = true;
        this.isCategoryDashBoardActive = false;
        this.isEnvelopeDashBoardActive = false;
        this.isPayeeDashBoardActive = false;

        this.isTransactionDashBoardActive = false;
        this.isBankAccountFormActive = false;
    }
}
