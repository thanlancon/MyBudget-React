import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import TransactionList from "./transactionList";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NIL as NIL_UUID } from "uuid";

function TransactionDashBoard() {
    const { transactionStore,globalStore } = useStore();
    let { bankid } = useParams();

    useEffect(() => {
        transactionStore.bankID = bankid ? bankid : NIL_UUID;
        loadTransactions();
    }, [bankid]);

    function loadTransactions(pageNumber: number = 1) {
        transactionStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    return (
        <div className="flexhorizontal fullwidth flexhorizontaltopcenter">
            <TransactionList />
        </div>
    )
}

export default observer(TransactionDashBoard)
