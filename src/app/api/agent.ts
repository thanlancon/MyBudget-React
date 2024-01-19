
import axios, { AxiosError } from "axios";
import Bank from "../models/bank";
import BankAccountType from "../models/bankAccountType";
import { BankAccount } from "../models/bankAccount";
import Category from "../models/category";
import Payee from "../models/payee";
import Envelope from "../models/envelope";
import Transaction from "../models/transaction";
import EnvelopeBalanceTransfer from "../models/envelopeBalanceTransfer";
import { User, UserFormValues } from "../models/user";
import { store } from "./stores/stores";
import Result from "./core/result";
import { PaginatedResult } from "./core/pagination";
import ValueAndText from "../models/valueandtext";
import { EnvelopeBalance } from "../models/monthlyEnvelopeBalance";
///////////////////////////////////////
//handle request/response for Bank
//////////////////////////////////


const getCurrentHost =
    // import.meta.env.MODE === "development"
    //     ? "http://localhost:4000/api"
    //     : "https://52.3.99.42:100/api";
    import.meta.env.MODE === "development"
        ? "http://localhost:4000/api"
        : "http://www.khuongle.net:100/api";
    // import.meta.env.MODE === "development"
    //     ? "http://localhost:4000/api"
    //     : "http://192.168.1.51:4000/api";

const baseUrl = getCurrentHost;
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})



//store CRUD request functions
// const requests = {
//     get: <T>(url: string) => axios.get<T>(url).then(responseBody),
//     post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
//     put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
//     delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
// }
const requests = {
    getpaging: (url: string, params: URLSearchParams) => axios.get<PaginatedResult<any>>(url, { params })
        .then(
            response => {
                if (response.status === 200) {
                    const resultData = <any><unknown>response.data;
                    var pagination = null;
                    const paginationHeader = response.headers['pagination'];
                    if (paginationHeader) {
                        pagination = JSON.parse(paginationHeader);
                    }
                    return PaginatedResult.SuccessWithPagination<any>(resultData, pagination);
                }
                return PaginatedResult.Failure<any>(response.statusText);
            }
        ).catch(error => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return PaginatedResult.Failure<any>(error.response.data);
                }
            }
            return PaginatedResult.Failure<any>(error);
        }),
    get: (url: string, params: URLSearchParams | undefined = undefined) => axios.get<Result<any>>(url, { params }).then(
        response => {
            if (response.status === 200) {
                return Result.Success<any>(response.data);
            }
            return Result.Failure<any>(response.data);
        }).catch(error => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return Result.Failure<any>(error.response.data);
                }
            }
            return Result.Failure<any>(error);
        }),

    post: (url: string, body: {}) => axios.post<Result<any>>(url, body).then(
        response => {
            if (response.status === 200) {
                return Result.Success<any>();
            }
            return Result.Failure<any>(response.data);
        }).catch(error => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return Result.Failure<any>(error.response.data);
                }
            }
            return Result.Failure<any>(error);
        }),
    put: (url: string, body: {}) => axios.put<Result<any>>(url, body).then(
        response => {

            if (response.status === 200) {
                return Result.Success<any>();
            }
            return Result.Failure<any>(response.data);
        }).catch(error => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return Result.Failure<any>(error.response.data);
                }
            }
            return Result.Failure<any>(error);
        }),
    delete: (url: string) => axios.delete<Result<any>>(url).then(
        response => {
            if (response.status === 200) {
                return Result.Success<any>();
            }
            return Result.Failure<any>(response.data);
        }).catch(error => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return Result.Failure<any>(error.response.data);
                }
            }
            return Result.Failure<any>(error);
        }),
}

const Account = {
    current: (): Promise<Result<User>> => requests.get('/account'),
    login: (user: UserFormValues): Promise<Result<User>> => requests.post('/account/login', user),
    register: (user: UserFormValues) => requests.post('/account/register', user)
}

const linkBank = '/banks';
const Banks = {
    list: (params: URLSearchParams): Promise<PaginatedResult<Bank[]>> => requests.getpaging(`${linkBank}`, params),
    details: (id: string): Promise<Result<Bank>> => requests.get(`${linkBank}/${id}`),
    update: (dataItem: Bank): Promise<Result<string>> => requests.put(`${linkBank}/${dataItem.id}`, dataItem),
    create: (dataItem: Bank): Promise<Result<string>> => requests.post(`${linkBank}`, dataItem),
    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkBank}/${id}`)
}

const linkBankAccType = '/bankaccounttypes';
const BankAccountTypes = {
    list: (params: URLSearchParams): Promise<PaginatedResult<BankAccountType[]>> => requests.getpaging(`${linkBankAccType}`, params),
    details: (id: string): Promise<Result<BankAccountType>> => requests.get(`${linkBankAccType}/${id}`),
    update: (dataItem: BankAccountType): Promise<Result<string>> => requests.put(`${linkBankAccType}`, dataItem),
    create: (dataItem: BankAccountType): Promise<Result<string>> => requests.post(`${linkBankAccType}`, dataItem),
    delete: (id: string) => requests.delete(`${linkBankAccType}/${id}`)
}
const linkBankAcc = '/bankaccounts';
const BankAccounts = {
    list: (params: URLSearchParams): Promise<PaginatedResult<BankAccount[]>> => requests.getpaging(`${linkBankAcc}`, params),
    details: (id: string): Promise<Result<BankAccount>> => requests.get(`${linkBankAcc}/${id}`),
    update: (dataItem: BankAccount): Promise<Result<string>> => requests.put(`${linkBankAcc}/${dataItem.id}`, dataItem),
    create: (dataItem: BankAccount): Promise<Result<string>> => requests.post(`${linkBankAcc}`, dataItem),
    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkBankAcc}/${id}`),
}

const linkCategory = '/categories';
const Categories = {
    list: (params: URLSearchParams): Promise<PaginatedResult<Category[]>> => requests.getpaging(`${linkCategory}`, params),
    details: (id: string): Promise<Result<Category>> => requests.get(`${linkCategory}/${id}`),
    update: (dataItem: Category): Promise<Result<string>> => requests.put(`${linkCategory}/${dataItem.id}`, dataItem),
    create: (dataItem: Category): Promise<Result<string>> => requests.post(`${linkCategory}`, dataItem),
    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkCategory}/${id}`)
}

const linkPayee = '/payees';
const Payees = {
    list: (params: URLSearchParams): Promise<PaginatedResult<Payee[]>> => requests.getpaging(`${linkPayee}`, params),
    details: (id: string): Promise<Result<Payee>> => requests.get(`${linkPayee}/${id}`),

    update: (dataItem: Payee): Promise<Result<string>> => requests.put(`${linkPayee}/${dataItem.id}`, dataItem),

    create: (dataItem: Payee): Promise<Result<string>> => requests.post(`${linkPayee}`, dataItem),

    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkPayee}/${id}`)
}


const linkEnvelope = '/envelopes';
const Envelopes = {
    list: (params: URLSearchParams): Promise<PaginatedResult<Envelope[]>> => requests.getpaging(`${linkEnvelope}`, params),
    getMonthlyEnvelopeBalances: (params: URLSearchParams): Promise<Result<EnvelopeBalance[]>> => requests.get(`${linkEnvelope}/monthlybalances`, params),
    details: (id: string): Promise<Result<Envelope>> => requests.get(`${linkEnvelope}/${id}`),
    update: (dataItem: Envelope): Promise<Result<string>> => requests.put(`${linkEnvelope}/${dataItem.id}`, dataItem),
    transferFund: (dataItem: EnvelopeBalanceTransfer): Promise<Result<string>> => requests.put(`${linkEnvelope}/transferfund`, dataItem),
    autozerobalance: (id: string): Promise<Result<string>> => requests.put(`${linkEnvelope}/autozerobalance/${id}`, {}),
    create: (dataItem: Envelope): Promise<Result<string>> => requests.post(`${linkEnvelope}`, dataItem),
    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkEnvelope}/${id}`)
}

const linkTransaction = '/transactions';
const Transactions = {
    list: (params: URLSearchParams): Promise<PaginatedResult<Transaction[]>> => requests.getpaging(`${linkTransaction}`, params),
    getMonthlyWithEvelope: (params: URLSearchParams): Promise<PaginatedResult<Transaction[]>> => requests.getpaging(`${linkTransaction}/monthly`, params),
    details: (id: string): Promise<Result<Transaction>> => requests.get(`${linkTransaction}/${id}`),
    update: (dataItem: Transaction): Promise<Result<string>> => requests.put(`${linkTransaction}/${dataItem.id}`, dataItem),
    create: (dataItem: Transaction): Promise<Result<string>> => requests.post(`${linkTransaction}`, dataItem),
    delete: (id: string): Promise<Result<string>> => requests.delete(`${linkTransaction}/${id}`)
}



const linkReadOnlyList = '/readonlylist';
const ReadOnlyList = {
    listbanks: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listbanks`),
    listbankaccounts: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listbankaccounts`),
    listbankaccounttypes: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listbankaccounttypes`),
    listcategories: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listcategories`),
    listenvelopes: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listenvelopes`),
    listpayees: (): Promise<Result<ValueAndText[]>> => requests.get(`${linkReadOnlyList}/listpayees`),

}
const Agent = {
    Account,
    Banks,
    BankAccountTypes,
    BankAccounts,
    Categories,
    Payees,
    Envelopes,
    Transactions,
    ReadOnlyList
}

export default Agent;
