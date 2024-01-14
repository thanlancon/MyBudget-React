import { makeAutoObservable, runInAction } from "mobx";
import BankAccountType from "../../models/bankAccountType";
import Agent from "../agent";
import { v4 as uuid4 } from 'uuid';
import { handleError } from "../handleresponemessage";
import Result from "../core/result";
import { Pagination, PagingParams } from "../core/pagination";

export class BankAccountTypeStore {
    bankAccountTypes: BankAccountType[] = [];
    selectedItem: BankAccountType | undefined = undefined;
    isViewList = false;
    isWaitingServerResponse = false;

    pagingParams = new PagingParams();
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
    addItem = (item: BankAccountType) => {
        this.bankAccountTypes = [...this.bankAccountTypes.filter(x => x.id !== item.id), item];
    }
    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    private sortArray(array: BankAccountType[]) {
        return [...array.sort((a, b) => {
            const codeA = a.code.toLowerCase();
            const codeB = b.code.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    setArray = (array: BankAccountType[]) => {
        this.bankAccountTypes = [];
        this.bankAccountTypes = [...array];
        this.bankAccountTypes = this.sortArray(this.bankAccountTypes);
    }
    clearBankAccountStores = () => {
        this.bankAccountTypes = [];
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        if (pagenumber !== -1 && pagesize !== -1) {
            this.setPagingParams(new PagingParams(pagenumber, pagesize));
        }
        this.setIsLoadingData(true)
        const result = await Agent.BankAccountTypes.list(this.axiosParams);
        try {
            if (result.isSuccess) {
                const resultData = result.data ? result.data : [];
                this.clearBankAccountStores();
                resultData.forEach(x => {
                    this.addItem(x);
                });
                this.setPagination(result.pagination);
                this.setIsLoadingData(false);
            }
            this.setIsLoadingData(false);
        } catch (error) {
            console.log(error);
            this.setIsLoadingData(false);
        }
    }
    setSelectedItem = (id: string | undefined = '') => {
        this.selectedItem = id ? this.bankAccountTypes.find(b => b.id === id) : undefined
    }
    openForm = (id: string | undefined = '') => {
        this.setSelectedItem(id);
    }
    closeForm = () => {
        this.setSelectedItem();
    }
    createItem = async (item: BankAccountType) => {
        this.setIsLoadingData();
        try {
            const postedItem =  {...item};
            postedItem.id = uuid4();
            const result = await Agent.BankAccountTypes.create(postedItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccountTypes = this.sortArray([...this.bankAccountTypes, postedItem]);
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
    updateItem = async (item: BankAccountType) => {
        this.setIsLoadingData();
        try {
            const postedItem =  {...item};
            const result = await Agent.BankAccountTypes.update(postedItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccountTypes = this.sortArray([...this.bankAccountTypes.filter(b => b.id !== postedItem.id)
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
            const result = await Agent.BankAccountTypes.delete(id);
            if (result.isSuccess) {
                runInAction(() => {
                    this.bankAccountTypes = this.sortArray([...this.bankAccountTypes.filter(b => b.id !== id)]);
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
}
