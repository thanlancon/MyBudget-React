import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import TransactionList from "./transactionList";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NIL as NIL_UUID } from "uuid";
import { RouterURL } from "../../../app/api/routers/routerURL";

function TransactionDashBoard() {
    const { transactionStore,globalStore } = useStore();
    const navigate=useNavigate();

    let { bankid ,bankcode} = useParams();
    useEffect(() => {
        transactionStore.bankID = bankid ? bankid : NIL_UUID;
        loadTransactions();
    }, [bankid]);

    function loadTransactions(pageNumber: number = 1) {
        transactionStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    function clickNewTransaction(){
        navigate(RouterURL.getNewTransactionURL());
    }
    return (
        <div className="flexcolumn fullwidth flexhorizontaltopcenter">
            <div className="fullwidth dashboardtitle textcenter">{`${bankcode} Transactions`}</div>
            <div>
                <button onClick={clickNewTransaction}>New Transaction</button>
            </div>
            <TransactionList />
        </div>
    )
}

export default observer(TransactionDashBoard)
