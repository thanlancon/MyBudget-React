import { createContext, useContext } from "react";
import { BankStore } from "./bankStore";
import { MainDaskBoardStore } from "./maindaskboard";
import { BankAccountTypeStore } from "./bankAccountTypeStore";
import { BankAccountStore } from "./bankAccountStore";
import { ReadOnlyListStore } from "./readOnlyListStore";
import { CategoryStore } from "./categoryStore";
import { EnvelopeStore } from "./envelopeStore";
import { PayeeStore } from "./payeeStore";
import { TransactionStore } from "./transactionStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalFormStore from "./modalFormStore";
import FloatedMenuStore from "./floatedMenuStore";
import { GlobalStore } from "./globalStore";
import { MonthlyTransactionStore } from "./monthlyTransactionStore";

interface Store {
    globalStore: GlobalStore
    bankStore: BankStore
    bankAccountTypeStore: BankAccountTypeStore
    bankAccountStore: BankAccountStore
    categoryStore: CategoryStore
    envelopeStore: EnvelopeStore
    payeeStore: PayeeStore
    transactionStore: TransactionStore
    monthlyTransactionStore: MonthlyTransactionStore

    readOnlyListStore: ReadOnlyListStore
    mainDashBoardStore: MainDaskBoardStore
    commonStore: CommonStore
    userStore: UserStore
    modalFormStore: ModalFormStore
    floatedMenuStore: FloatedMenuStore
}

export const store: Store = {
    globalStore:new GlobalStore(),

    bankStore: new BankStore(),
    bankAccountTypeStore: new BankAccountTypeStore(),
    bankAccountStore: new BankAccountStore(),
    categoryStore: new CategoryStore(),
    envelopeStore: new EnvelopeStore(),
    payeeStore: new PayeeStore(),
    transactionStore: new TransactionStore(),
    monthlyTransactionStore:new MonthlyTransactionStore(),
    readOnlyListStore: new ReadOnlyListStore(),
    mainDashBoardStore: new MainDaskBoardStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalFormStore: new ModalFormStore(),
    floatedMenuStore: new FloatedMenuStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
