import { makeAutoObservable, runInAction } from "mobx";
import ValueAndText from "../../models/valueandtext";
import Agent from "../agent";
import { handleError } from "../handleresponemessage";

export class ReadOnlyListStore {
    private _banks: ValueAndText[] = []
    private _bankAccounts: ValueAndText[] = []
    private _bankAccountTypes: ValueAndText[] = []
    private _categories: ValueAndText[] = []
    private _envelopes: ValueAndText[] = []
    private _payees: ValueAndText[] = []

    constructor() {
        makeAutoObservable(this);
    }

    get banks() {
        if (this._banks.length === 0) {
            this.loadBanks(true);
        }
        return this._banks;
    }
    get bankAccounts() {
        if (this._bankAccounts.length === 0) {
            this.loadBankAccounts(true);
        }
        return this._bankAccounts;
    }
    get bankAccountTypes() {
        if (this._bankAccountTypes.length === 0) {
            this.loadBankAccountTypes(true);
        }
        return this._bankAccountTypes;
    }
    get categories() {
        if (this._categories.length === 0) {
            this.loadCategories(true);
        }
        return this._categories;
    }
    get envelopes() {
        if (this._envelopes.length === 0) {
            this.loadEnvelopes(true);
        }
        return this._envelopes;
    }
    get payees() {
        if (this._payees.length === 0) {
            this.loadPayees(true);
        }
        return this._payees;
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
            if (this._banks.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbanks();
            if (result.isSuccess) {
                runInAction(() => {
                    this._banks = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadBankAccounts = async (forceReload = false) => {
        if (!forceReload) {
            if (this._bankAccounts.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbankaccounts();
            if (result.isSuccess) {
                runInAction(() => {
                    this._bankAccounts = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadBankAccountTypes = async (forceReload = false) => {
        if (!forceReload) {
            if (this._bankAccountTypes.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listbankaccounttypes();
            if (result.isSuccess) {
                runInAction(() => {
                    this._bankAccountTypes = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadCategories = async (forceReload = false) => {
        if (!forceReload) {
            if (this._categories.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listcategories();
            if (result.isSuccess) {
                runInAction(() => {
                    this._categories = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadEnvelopes = async (forceReload = false) => {
        if (!forceReload) {
            if (this._envelopes.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listenvelopes();
            if (result.isSuccess) {
                runInAction(() => {
                    this._envelopes = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
    loadPayees = async (forceReload = false) => {
        if (!forceReload) {
            if (this._payees.length > 0) {
                return;
            }
        }
        try {
            const result = await Agent.ReadOnlyList.listpayees();
            if (result.isSuccess) {
                runInAction(() => {
                    this._payees = this.sortList(result.data ? result.data : []);
                })
            }
        } catch (error) {
            handleError(error);
        }
    }
}
