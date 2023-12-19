import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../../layouts/App";
import EnvelopeDashBoard from "../../../features/dashboards/envelope/envelopeDashBoard";
import TransactionDashBoardPaging from "../../../features/dashboards/transaction/transactionDashBoardPaging";
import Bankdashboard from "../../../features/dashboards/bank/bankdashboard";
import BankAccountTypeDashBoard from "../../../features/dashboards/bankaccounttype/bankAccountTypeDashBoard";
import CategoryDashBoard from "../../../features/dashboards/category/categoryDashBoard";
import PayeeDashBoard from "../../../features/dashboards/payee/payeeDashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
        {
            path:"banks",
            element:<Bankdashboard/>
        },
        {
            path:"bankaccounttypes",
            element:<BankAccountTypeDashBoard/>
        },
        {
            path:"categories",
            element:<CategoryDashBoard/>
        },
        {
            path:"envelopes",
            element:<EnvelopeDashBoard/>
        },
        {
            path:"payees",
            element:<PayeeDashBoard/>
        },
        {
            path:"transactions/bank/:bankid",
            element:<TransactionDashBoardPaging/>
        }
    ]
  },
]);

export default router;
