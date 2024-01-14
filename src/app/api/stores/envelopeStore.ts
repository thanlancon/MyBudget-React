import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid4 } from 'uuid';
import Envelope from "../../models/envelope";
import Agent from "../agent";
import ResponseConstants from "../../constants/transactionActionStatus";
import EnvelopeBalanceTransfer from "../../models/envelopeBalanceTransfer";
import Result from "../core/result";
import { Pagination, PagingParams } from "../core/pagination";
import { MonthlyEnvelopeBalances } from "../../models/monthlyEnvelopeBalance";

export class EnvelopeStore {
    envelopes: Envelope[] = [];
    monthlyEnvelopeBalances: MonthlyEnvelopeBalances | undefined = undefined;
    selectedItem: Envelope | undefined = undefined;
    isViewList = false;
    isTransferFund = false;
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
    addItem = (item: Envelope) => {
        this.envelopes = [...this.envelopes.filter(x => x.id !== item.id), item];
    }

    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    private sortArray(array: Envelope[]) {
        return [...array.sort((a, b) => {
            const codeA = a.name.toLowerCase();
            const codeB = b.name.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    setArray = (array: Envelope[]) => {
        this.envelopes = [];
        this.envelopes = [...array];
        this.envelopes = this.sortArray(this.envelopes);
    }
    clearEnvelopes = () => {
        this.envelopes = [];
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        if (pagenumber !== -1 && pagesize !== -1) {
            this.setPagingParams(new PagingParams(pagenumber, pagesize));
        }
        this.setIsLoadingData(true)
        const result = await Agent.Envelopes.list(this.axiosParams);
        try {
            if (result.isSuccess) {
                const resultData = result.data ? result.data : [];
                this.clearEnvelopes();
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
        this.selectedItem = id ? this.envelopes.find(b => b.id === id) : undefined
    }
    openForm = (id: string | undefined = '') => {
        this.setSelectedItem(id);
        this.isTransferFund = false;
    }
    closeForm = async () => {
        this.setSelectedItem();
        await this.loadData();
    }
    setFundTransferMode = (transferMode = true) => {
        if (transferMode) {
            this.isTransferFund = true;
        }
        else {
            this.isTransferFund = false;
        }

    }

    createItem = async (item: Envelope) => {
        this.setIsLoadingData();
        const copyItem = { ...item };
        copyItem.id = uuid4();
        try {

            const response = await Agent.Envelopes.create(copyItem);
            if (response.isSuccess) {
                runInAction(() => {
                    this.envelopes = [copyItem, ...this.envelopes];
                });
            }
            this.setIsLoadingData(false);
            return response;
        } catch (error) {
            this.setIsLoadingData(false);
            return Result.Failure(<string>error);
        }

    }
    updateItem = async (item: Envelope) => {
        this.setIsLoadingData();
        try {
            const copyItem = { ...item };
            const response = await Agent.Envelopes.update(copyItem);
            if (response.isSuccess) {
                runInAction(() => {
                    this.envelopes = this.sortArray([...this.envelopes.filter(b => b.id !== copyItem.id)
                        , copyItem]);
                });
            }
            this.setIsLoadingData(false);
            return response;
        }

        catch (error) {
            this.setIsLoadingData(false);
            return Result.Failure(<string>error);
        }
    }
    deleteItem = async (id: string) => {
        this.setIsLoadingData();
        try {
            const response = await Agent.Envelopes.delete(id);
            if (response.isSuccess) {
                runInAction(() => {
                    this.envelopes = this.sortArray([...this.envelopes.filter(b => b.id !== id)]);
                });
            }
            this.setIsLoadingData(false);
            return response;
        }
        catch (error) {
            this.setIsLoadingData(false);
            return Result.Failure(<string>error);
        }
    }
    transferFund = async (envelopeTransfer: EnvelopeBalanceTransfer) => {
        this.setIsLoadingData();
        try {
            const copyItem = { ...envelopeTransfer };
            const response = await Agent.Envelopes.transferFund(copyItem);

            if (response.isSuccess) {
                runInAction(() => {
                    var envelopeFrom = this.envelopes.find(x => x.id === copyItem.envelopeID_From);
                    var envelopeTo = this.envelopes.find(x => x.id === copyItem.envelopeID_To);
                    if (envelopeFrom && envelopeTo) {
                        this.envelopes = this.sortArray([
                            ...this.envelopes.filter(
                                b => b.id !== envelopeFrom?.id
                                    && b.id !== envelopeTo?.id)
                            , envelopeFrom, envelopeTo
                        ]);
                    }
                });
            }
            this.setIsLoadingData(false);
            return response;

        } catch (error) {
            this.setIsLoadingData(false);
            return Result.Failure(<string>error);
        }
    }
    autozerobalance = async (id: string) => {
        this.setIsLoadingData();
        try {
            const envelope = this.envelopes.find(x => x.id === id);
            if (envelope === null || envelope === undefined) {
                return ResponseConstants.Envelope.NotFound;
            }
            const response = await Agent.Envelopes.autozerobalance(id);
            if (response.isSuccess) {
                runInAction(() => {
                    const fundingEvelope = this.envelopes.find(x => x.id === envelope.envelopeId_Funding);
                    if (fundingEvelope) {
                        fundingEvelope.totalBalance += envelope.totalBalance;
                    }
                    envelope.totalBalance = 0;
                    this.envelopes = this.sortArray([...this.envelopes.filter(b => b.id !== envelope.id)
                        , envelope]);
                });
            }
            this.setIsLoadingData(false);
            return response;
        }

        catch (error) {
            this.setIsLoadingData(false);
            return Result.Failure(<string>error);
        }
    }
    loadMonthlyEnvelopeBalances = async (month: number, year: number) => {
        const param = new URLSearchParams();
        param.append('month', month.toString());
        param.append('year', year.toString());
        const result = await Agent.Envelopes.getMonthlyEnvelopeBalances(param);
        if (result.isSuccess) {
            runInAction(() => {
                this.monthlyEnvelopeBalances = new MonthlyEnvelopeBalances(month, year, result.data)
            });
        }
        else {
            runInAction(() => {
                this.monthlyEnvelopeBalances = undefined;
            });
        }
    }
}
