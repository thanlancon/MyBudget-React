import { makeAutoObservable, runInAction } from "mobx";
import Bank from "../../models/bank";
import Agent from "../agent";
import { v4 as uuid4 } from 'uuid';
import Result from "../core/result";
import { handleError } from "../handleresponemessage";
import { Pagination, PagingParams } from "../core/pagination";

export class BankStore {
    banks: Bank[] = [];
    selectedBank: Bank | undefined = undefined;
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
    addItem = (item: Bank) => {
        this.banks = [...this.banks.filter(x => x.id !== item.id), item];
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        if (pagenumber !== -1 && pagesize !== -1) {
            this.setPagingParams(new PagingParams(pagenumber, pagesize));
        }
        this.setIsLoadingData(true)
        const result = await Agent.Banks.list(this.axiosParams);
        try {
            if (result.isSuccess) {
                const resultData = result.data ? result.data : [];
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
    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    setBanks = (banks: Bank[]) => {
        this.banks = [];
        banks.forEach(bank => {
            this.banks.push(bank);
        });
        this.banks = this.sortBanks(this.banks);
    }
    private sortBanks(banks: Bank[]) {
        return [...banks.sort((a, b) => {
            const codeA = a.code.toLowerCase();
            const codeB = b.code.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    setSelectedBank(id?: string) {
        id ? this.selectedBank = this.banks.find(b => b.id === id) : this.selectedBank = undefined;
    }
    openViewDetail = (id: string) => {
        this.setSelectedBank(id);
    }
    closeViewDetail = () => {
        this.selectedBank = undefined;
        this.isWaitingServerResponse = false;
    }
    openForm = (id?: string) => {
        this.setSelectedBank(id);
        this.isWaitingServerResponse = false;
    }
    closeForm = () => {
        this.setSelectedBank();
        this.isWaitingServerResponse = false;
    }
    createBank = async (bank: Bank) => {
        this.setIsLoadingData(true);
        try {
            const copyItem = {...bank};
            copyItem.id = uuid4();
            const result = await Agent.Banks.create(copyItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.banks.push(copyItem);
                    this.banks = this.sortBanks(this.banks);
                    this.setSelectedBank(undefined);
                    this.isWaitingServerResponse = false;
                });
            }
            this.setIsLoadingData(false);
            return result;
        } catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }
    }
    updateBank = async (bank: Bank) => {
        this.setIsLoadingData(true);
        try {
            const copyItem = {...bank};
            const result = await Agent.Banks.update(copyItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.banks = [...this.banks.filter(b => b.id !== copyItem.id), copyItem];
                    this.banks = this.sortBanks(this.banks);
                    this.setSelectedBank(undefined);
                    this.isWaitingServerResponse = false;
                })
            }
            this.setIsLoadingData(false);
            return result;
        } catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }
    }
    deleteBank = async (id: string) => {
        this.setIsLoadingData(true);
        try {
            const result = await Agent.Banks.delete(id);
            if (result.isSuccess) {
                runInAction(() => {
                    this.banks = this.banks.filter(b => b.id !== id);
                    this.setSelectedBank(undefined);
                    this.isWaitingServerResponse = false;
                })
            }
            this.setIsLoadingData(false);
            return result;
        } catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }
    }
}
