import { makeAutoObservable } from "mobx"

//this store content things that are used for all store
export class GlobalStore {
    private _budgetDate: Date | null = null;
    private _defaultItemPerPage: number = 20;
    private _isShowMonthlyTransaction = false;

    constructor() {
        this._budgetDate = new Date(Date.now());
        makeAutoObservable(this);
    };
    setBudgetDate = (date: Date | null) => {
        this._budgetDate = date;
    }
    get budgetDate() {
        return this._budgetDate;
    }
    get getBudgetMonth() {
        if (this._budgetDate === null) return 0;
        return this._budgetDate.getMonth() + 1;
    }
    get getBudgetYear() {
        if (this._budgetDate === null) return 0;
        return this._budgetDate.getFullYear();
    }
    get getDefaultItemPerPage() {
        return this._defaultItemPerPage;
    }
    get isShowMonthlyTransaction() {
        return this._isShowMonthlyTransaction;
    }
    setShowMonthlyTransaction(isShow: boolean = true) {
        this._isShowMonthlyTransaction = isShow;
    }
}
