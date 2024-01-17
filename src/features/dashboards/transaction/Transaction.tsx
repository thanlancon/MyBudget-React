import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RouterURL } from "../../../app/api/routers/routerURL";
import { useStore } from "../../../app/api/stores/stores";
import TransactionForm from "./transactionForm";
import TransactionDetails from "./transactionDetails";

function Transaction() {
    const navigate = useNavigate();
    const { transactionStore } = useStore();
    const { setSelectedItem,bankID } = transactionStore;
    const [showNewForm, setShowNewForm] = useState(false);
    const [showDetail, setShowDetail] = useState(true);
    let { transactionid } = useParams();
    useEffect(() => {
        setSelectedItem(transactionid);
    }, []);
    function clickClose() {
        setSelectedItem();
        navigate(RouterURL.getTransactionURL(bankID));
    }
    function clickNew() {
        setSelectedItem(undefined);
        setShowDetail(false);
        setShowNewForm(true);
    }
    return (
        <div className="flexvertical fullwidth">
            <div className="flexhorizontal flexallmiddle fullwidth ">
                <div className="flexhorizontal colgapsm">
                    <button className="buttonsm closebutton" onClick={clickClose} >Close</button>
                    <button className="buttonsm" onClick={clickNew}>New</button>
                </div>
            </div>
            {showNewForm && <TransactionForm />}
            {showDetail && <TransactionDetails />}
        </div>
    )
}
export default observer(Transaction)
