import { makeAutoObservable, runInAction } from "mobx";
import ValueAndText from "../../models/valueandtext";
import Agent from "../agent";
import { handleError } from "../handleresponemessage";

export class ReadOnlyListStore {
    banks: ValueAndText[] = []
    bankAccounts: ValueAndText[] = []
    bankAccountTypes: ValueAndText[] = []
    categories: ValueAndText[] = []
    envelopes: ValueAndText[] = []
    payees: ValueAndText[] = []

    constructor() {
        makeAutoObservable(this);
    }

    private sortList(array: ValueAndText[]) {
        return [...array.sort((a, b) => {
            const codeA = a.text.toLowerCase();
            const codeB = b.text.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    loadBanks = async (forceReload = false) => {
        if (!forceReload) {
            if (this.banks.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbanks();
            if (result.isSuccess) {
                runInAction(() => {
                    this.banks = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadBankAccounts = async (forceReload = false) => {
        if (!forceReload) {
            if (this.bankAccounts.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbankaccounts();
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccounts = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadBankAccountTypes = async (forceReload = false) => {
        if (!forceReload) {
            if (this.bankAccountTypes.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbankaccounttypes();
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccountTypes = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadCategories = async (forceReload = false) => {
        if (!forceReload) {
            if (this.categories.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listcategories();
            if (result.isSuccess) {
                runInAction(() => {
                    this.categories = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadEnvelopes = async (forceReload = false) => {
        if (!forceReload) {
            if (this.envelopes.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listenvelopes();
            if (result.isSuccess) {
                runInAction(() => {
                    this.envelopes = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadPayees = async (forceReload = false) => {
        if (!forceReload) {
            if (this.payees.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listpayees();
            if (result.isSuccess) {
                runInAction(() => {
                    this.payees = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
}
