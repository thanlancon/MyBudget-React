import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../agent";
import { v4 as uuid4 } from 'uuid';
import { BankAccount } from "../../models/bankAccount";
import { handleError } from "../handleresponemessage";
import Result from "../core/result";
import { Pagination, PagingParams } from "../core/pagination";

export class BankAccountStore {
    bankAccounts: BankAccount[] = [];
    selectedItem: BankAccount | undefined = undefined;
    isViewList = false;
    isWaitingServerResponse = false;

    pagingParams = new PagingParams(1, 100);
    pagination: Pagination | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }
    setPagination = (pagination: Pagination | null) => {
        this.pagination = pagination;
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    addItem = (item: BankAccount) => {
        this.bankAccounts = [...this.bankAccounts.filter(x => x.id !== item.id), item];
    }
    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    private sortArray(array: BankAccount[]) {
        return [...array.sort((a, b) => {
            const codeA = a.code.toLowerCase();
            const codeB = b.code.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    setArray = (array: BankAccount[]) => {
        this.bankAccounts = [];
        this.bankAccounts = [...array];
        this.bankAccounts = this.sortArray(this.bankAccounts);
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        if (pagenumber !== -1 && pagesize !== -1) {
            this.setPagingParams(new PagingParams(pagenumber, pagesize));
        }
        try {
            this.setIsLoadingData();
            const result = await Agent.BankAccounts.list(this.axiosParams);

            if (result.isSuccess) {
                const resultData = result.data ? result.data : [];
                resultData.forEach(x => {
                    this.addItem(x);
                });
                this.setPagination(result.pagination);
                this.setIsLoadingData(false);
            }
            this.setIsLoadingData(false);
        }
        catch (error) {
            console.log(error);
            this.setIsLoadingData(false);
        }
    }

    setSelectedItem = (id: string | undefined = '') => {
        runInAction(() => {
            this.selectedItem = id ? this.bankAccounts.find(b => b.id === id) : undefined
        });
    }
    openForm = (id: string | undefined = '') => {
        this.setSelectedItem(id);
    }
    closeForm = () => {
        this.setSelectedItem();
    }
    createItem = async (item: BankAccount) => {
        this.setIsLoadingData();
        try {
            const postedItem = {...item};
            postedItem.id = uuid4();
            var result = await Agent.BankAccounts.create(postedItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccounts = this.sortArray([...this.bankAccounts, postedItem]);
                });
            }
            this.setIsLoadingData(false);
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }

    }
    updateItem = async (item: BankAccount) => {
        this.setIsLoadingData();
        try {
            const postedItem =  {...item};
            var result = await Agent.BankAccounts.update(postedItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccounts = this.sortArray([...this.bankAccounts.filter(b => b.id !== postedItem.id)
                        , postedItem]);
                });
            }
            this.setIsLoadingData(false);
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }

    }
    deleteItem = async (id: string) => {
        this.setIsLoadingData();
        try {
            var result = await Agent.BankAccounts.delete(id);
            if (result.isSuccess) {
                this.bankAccounts = this.sortArray([...this.bankAccounts.filter(b => b.id !== id)]);
            }
            this.setIsLoadingData(false);
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }

    }
}
