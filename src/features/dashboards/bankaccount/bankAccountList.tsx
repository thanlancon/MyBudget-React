import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { Button, ButtonGroup } from "semantic-ui-react";
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import { useNavigate } from "react-router-dom";
import { RouterURL } from "../../../app/api/routers/routerURL";

function BankAccountList() {
    const { bankAccountStore } = useStore();
    const { bankAccounts, openForm, deleteItem } = bankAccountStore;
    const navigate=useNavigate();
    function clickCode(bankId: string) {
        navigate(RouterURL.getTransactionURL(bankId));
    }
    return (
        <div className="grid gridcol2 table">
            <div className="tabletitle titletext">Name</div>
            <div className="tabletitle titletext">Balance</div>
            {bankAccounts.map((item, index) => (
                <>
                    <div className="hover" onClick={() => clickCode(item.id)}>{item.code}</div>
                    <div className="flexhorizontal flexmiddleright">
                        <span className={`currency ${item.totalBalance >= 0 ? 'possitivecurrency' : 'negativecurrency'}`}>{formatCurrencyNumber(item.totalBalance)}</span>
                    </div>
                </>
            ))}
        </div>
    )
}
export default observer(BankAccountList)
