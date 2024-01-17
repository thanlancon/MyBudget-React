import { observer } from "mobx-react-lite"
import EnvelopeForm from "./envelopeForm";
import { useState } from "react";
import { useStore } from "../../../app/api/stores/stores";
import EnvelopeTransferFund from "./envelopeTransferFund";
import { NIL as NIL_UUID } from "uuid";
import { useNavigate } from "react-router-dom";
import { RouterURL } from "../../../app/api/routers/routerURL";

function EnvelopeEdit() {
    const navigate=useNavigate();

    const { envelopeStore } = useStore();
    const { setSelectedItem, selectedItem, createItem, updateItem } = envelopeStore;

    const [showForm, setShowForm] = useState(true);
    const [showTransfer, setShowTransfer] = useState(false);

    async function autoZeroBalance(envelopeID = NIL_UUID) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to zero the balance!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            await envelopeStore.autozerobalance(envelopeID);
        }
    }
    function clickClose(){
        setSelectedItem();
        navigate(RouterURL.getEnvelopeURL());
    }
    function clickTransfer() {
        setShowTransfer(true);
        setShowForm(false);
    }
    function clickView() {
        setShowTransfer(false);
        setShowForm(true);
    }
    function clickZeroBalance() {
        setShowTransfer(false);
        setShowForm(true);
        autoZeroBalance(selectedItem?.id);
    }
    function clickNew() {
        setSelectedItem(undefined);
        setShowTransfer(false);
        setShowForm(true);
    }
    return (
        <div className="flexvertical fullwidth">
            <div className="flexhorizontal flexallmiddle fullwidth ">
                <div className="flexhorizontal colgapsm">
                    <button className="buttonsm closebutton" onClick={clickClose} >Close</button>
                    {!selectedItem == false && <button className="buttonsm" onClick={clickView} >View Detail</button>}
                    {!selectedItem == false && <button className="buttonsm" onClick={clickTransfer} >Transfer</button>}
                    {!selectedItem == false && <button className="buttonsm" onClick={clickZeroBalance}>Zero Balance</button>}
                    <button className="buttonsm" onClick={clickNew}>New</button>
                </div>
            </div>
            {showForm && <EnvelopeForm />}
            {showTransfer && <EnvelopeTransferFund />}

        </div>
    )
}
export default observer(EnvelopeEdit);
