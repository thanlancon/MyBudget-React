import { makeAutoObservable } from "mobx"

//this store content things that are used for all store
export class GlobalStore {
    budgetDate: Date | null = null

    constructor() {
        this.budgetDate = new Date(Date.now());
        makeAutoObservable(this);
    };
    get getBudgetMonth() {
        if (this.budgetDate === null) return 0;
        return this.budgetDate.getMonth() + 1;
    }
    get getBudgetYear() {
        if (this.budgetDate === null) return 0;
        return this.budgetDate.getFullYear();
    }
}
