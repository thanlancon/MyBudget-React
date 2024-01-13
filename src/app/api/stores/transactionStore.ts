import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../agent";
import Transaction from "../../models/transaction";
import { NIL as NIL_UUID } from 'uuid';
import { handleError } from "../handleresponemessage";
import Result from "../core/result";
import { Pagination, PagingParams } from "../core/pagination";


export class TransactionStore {
    transactions: Transaction[] = [];
    selectedItem: Transaction | undefined = undefined;
    isViewList = false;
    isWaitingServerResponse = false;
    private _bankId = NIL_UUID;
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get bankID() {
        return this._bankId;
    }
    set bankID(value: string) {
        this._bankId = value;
        this.clearTransactions();
    }
    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString())
        params.append('bankID', this._bankId.toString())

        return params;
    }

    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    private sortArray(array: Transaction[]) {
        return [...array.sort((a, b) => {
            const date1 = a.transactionDate;
            const date2 = b.transactionDate;
            if (!date2 || !date1) {
                return -1;
            }
            if (date1 < date2) return 1;
            if (date1 > date2) return -1;

            const post1 = a.postDate;
            const post2 = b.postDate;
            if (!post1 || !post2) {
                return -1;
            }
            if (post1 < post2) return 1;
            if (post1 > post2) return -1;

            const seq1 = a.sequenceNumber;
            const seq2 = b.sequenceNumber;
            if (!seq1 || !seq2) {
                return -1;
            }
            if (seq1 < seq2) return 1;
            if (seq1 > seq2) return -1;

            return 0;
        })];
    }

    addTransaction = (transaction: Transaction) => {
        this.transactions = [...this.transactions.filter(x => x.id !== transaction.id), transaction];
    }
    clearTransactions = () => {
        this.transactions = [];
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        try {
            if (pagenumber !== -1 && pagesize !== -1) {
                this.setPagingParams(new PagingParams(pagenumber, pagesize));
            }

            this.setIsLoadingData(true);

            var transactions: Transaction[] = [];
            if (this._bankId !== NIL_UUID) {
                const response = await Agent.Transactions.list(this.axiosParams);

                if (response.isSuccess) {
                    transactions = <Transaction[]>response.data;
                    this.clearTransactions();
                    transactions.forEach(transaction => {
                        this.addTransaction(transaction);
                    });
                    this.setPagination(response.pagination);
                    this.setIsLoadingData(false);
                }
                else {
                    this.clearTransactions();
                    this.setIsLoadingData(false);
                }
            }
            else {
                this.clearTransactions();
                this.setIsLoadingData(false);
            }
        }
        catch (error) {
            this.setIsLoadingData(false);
            handleError(error);
        }
    }
    setPagination = (pagination: Pagination | null) => {
        this.pagination = pagination;
    }
    setSelectedItem = (id: string | undefined = '') => {
        this.selectedItem = id ? this.transactions.find(b => b.id === id) : undefined
    }
    setEmptyTransaction = () => {
        this.setSelectedItem();
    }
    //load data base on existed pagination, but pagenumber = 1
    reloadData = async () => {
        const pageNumber = 1;
        const pageSize = this.pagination?.itemsPerPage ? this.pagination.itemsPerPage : 30;
        this.setIsLoadingData(true);
        this.setPagingParams(new PagingParams(pageNumber, pageSize));
        this.clearTransactions();
        await this.loadData();
        this.setIsLoadingData(false);
    }
    openList = () => {
        this.isViewList = true;
    }
    openForm = (id: string | undefined = '') => {
        this.setSelectedItem(id);

        this.isViewList = false;
    }
    closeForm = () => {
        this.setSelectedItem();
        this.loadData();
        this.isViewList = true;
    }
    openDetails = (id: string | undefined = '') => {
        this.setSelectedItem(id);
        this.isViewList = false;
    }
    closeDetails = () => {
        this.setSelectedItem();
        this._bankId = NIL_UUID;
        this.loadData();
        this.isViewList = true;
    }
    createItem = async (item: Transaction) => {
        this.setIsLoadingData();
        try {
            const copyItem = { ...item };
            // postedItem.id = uuid4();
            const response = await Agent.Transactions.create(copyItem);
            runInAction(() => {
                if (response.isSuccess) {
                    this.loadData();
                }
            });
            this.setIsLoadingData(false);
            return response;
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
            const response = await Agent.Transactions.delete(id);
            if (response.isSuccess) {
                runInAction(() => {
                    this.transactions = this.sortArray([...this.transactions.filter(b => b.id !== id)]);
                });

            }
            this.setIsLoadingData(false);
            return response;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }


    }
}
