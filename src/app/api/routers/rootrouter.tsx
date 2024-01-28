import {
    createHashRouter
} from "react-router-dom";
import App from "../../layouts/App";
import EnvelopeDashBoard from "../../../features/dashboards/envelope/envelopeDashBoard";
import TransactionDashBoardPaging from "../../../features/dashboards/transaction/transactionDashBoardPaging";
import Bankdashboard from "../../../features/dashboards/bank/bankdashboard";
import BankAccountTypeDashBoard from "../../../features/dashboards/bankaccounttype/bankAccountTypeDashBoard";
import CategoryDashBoard from "../../../features/dashboards/category/categoryDashBoard";
import PayeeDashBoard from "../../../features/dashboards/payee/payeeDashBoard";
import { RouterURL } from "./routerURL";
import BankAccount from "../../../features/dashboards/bankaccount/BankAccount";
import Transaction from "../../../features/dashboards/transaction/Transaction";
import EnvelopeDetail from "../../../features/dashboards/envelope/EnvelopeDetail";

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children:[
        {
            path:RouterURL.pathBanks,
            element:<Bankdashboard/>
        },
        {
            path:RouterURL.pathBankAccountTypes,
            element:<BankAccountTypeDashBoard/>
        },
        {
            path:RouterURL.pathCategories,
            element:<CategoryDashBoard/>
        },
        {
            path:RouterURL.pathEnvelopes,
            element:<EnvelopeDashBoard/>
        },
        {
            path:RouterURL.pathPayees,
            element:<PayeeDashBoard/>
        },
        {
            path:RouterURL.pathTransactions,
            element:<TransactionDashBoardPaging/>
        },
        {
            path:RouterURL.pathEnvelopeDetail,
            element:<EnvelopeDetail/>
        },
        {
            path:RouterURL.pathBankAccounts,
            element:<BankAccount/>
        },
        {
            path:RouterURL.pathTransactionDetail,
            element:<Transaction key='transactiondetail'/>,

        },
        {
            path:RouterURL.pathNewTransaction,
            element:<Transaction key='newtransaction'/>
        }
    ]
  },
]);

export default router;
