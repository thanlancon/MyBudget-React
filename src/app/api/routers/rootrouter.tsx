import {
  createHashRouter,
} from "react-router-dom";
import App from "../../layouts/App";
import EnvelopeDashBoard from "../../../features/dashboards/envelope/envelopeDashBoard";
import TransactionDashBoardPaging from "../../../features/dashboards/transaction/transactionDashBoardPaging";
import Bankdashboard from "../../../features/dashboards/bank/bankdashboard";
import BankAccountTypeDashBoard from "../../../features/dashboards/bankaccounttype/bankAccountTypeDashBoard";
import CategoryDashBoard from "../../../features/dashboards/category/categoryDashBoard";
import PayeeDashBoard from "../../../features/dashboards/payee/payeeDashBoard";
import { RouterURL } from "./routerURL";

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
        }
    ]
  },
]);

export default router;
