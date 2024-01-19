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
    const { setSelectedItem, selectedItem } = transactionStore;
    const [showNewForm, setShowNewForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    let { transactionid } = useParams();
    useEffect(() => {
        setSelectedItem(transactionid);
        if (selectedItem?.id) {
            setShowDetail(true);
            setShowNewForm(false);
        }
        else {
            setShowDetail(false);
            setShowNewForm(true);
        }
    }, [transactionid,selectedItem]);
    function clickClose() {
        setSelectedItem();
        navigate(RouterURL.getBankAccountURL());
    }
    function clickNew() {
        navigate(RouterURL.getNewTransactionURL());
    }
    return (
        <div className="flexcolumn fullwidth">

            <div className="flexrow fullwidth" style={{ justifyContent: 'center' }}>
                <div className="flexrow colgapsm">
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
