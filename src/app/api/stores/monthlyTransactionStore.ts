import { makeAutoObservable } from "mobx";
import Agent from "../agent";
import Transaction from "../../models/transaction";
import { NIL as NIL_UUID } from 'uuid';
import { handleError } from "../handleresponemessage";
import { Pagination, PagingParams } from "../core/pagination";

export class MonthlyTransactionStore {
    transactions: Transaction[] = [];
    selectedItem: Transaction | undefined = undefined;
    isViewList = false;
    isWaitingServerResponse = false;
    private _envelopeID = NIL_UUID;
    month: number = 0;
    year: number = 0;
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get emvelopeID() {
        return this._envelopeID;
    }
    set emvelopeID(value: string) {
        this._envelopeID = value;
        this.clearTransactions();
    }

    getMonthlyEnvelopeParams = (month: number, year: number, envelopeID: string) => {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString())
        params.append('envelopeid', envelopeID)
        params.append('month', month.toString())
        params.append('year', year.toString())

        return params;
    }
    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    addTransaction = (transaction: Transaction) => {
        this.transactions = [...this.transactions.filter(x => x.id !== transaction.id), transaction];
    }
    clearTransactions = () => {
        this.transactions = [];
    }

    loadData = async (month: number, year: number, envelopeID: string, pagenumber: number = -1, pagesize: number = -1) => {
        try {
            this.month = month;
            this.year = year;
            this._envelopeID = envelopeID;
            if (pagenumber !== -1 && pagesize !== -1) {
                this.setPagingParams(new PagingParams(pagenumber, pagesize));
            }
            this.setIsLoadingData(true);
            var transactions: Transaction[] = [];
            const response = await Agent.Transactions.getMonthlyWithEvelope(this.getMonthlyEnvelopeParams(month, year, envelopeID));

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
        await this.loadData(this.month, this.year, this._envelopeID);
        this.setIsLoadingData(false);
    }
    openList = () => {
        this.isViewList = true;
    }
}
