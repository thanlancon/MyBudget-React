import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import { useNavigate } from "react-router-dom";
import { RouterURL } from "../../../app/api/routers/routerURL";

function BankAccountList() {
    const { bankAccountStore } = useStore();
    const { bankAccounts } = bankAccountStore;
    const navigate = useNavigate();
    function clickCode(bankId: string, bankcode: string) {
        navigate(RouterURL.getTransactionsURL(bankId, bankcode));
    }
    return (
        <div className="flexcolumn">
            {bankAccounts.map((item, index) => (
                <div className="grid gridcol2 table fullwidth"
                key={item.id}
                >
                    {index === 0 && <div className="tabletitle titletext">Name</div>}
                    {index === 0 && <div className="tabletitle titletext">Balance</div>}
                    <div className="hover" onClick={() => clickCode(item.id, item.code)}>{item.code}</div>
                    <div className="flexrow"
                        style={{ justifyContent: 'right' }}
                    >
                        <span className={`currency ${item.totalBalance >= 0 ? 'possitivecurrency' : 'negativecurrency'}`}>{formatCurrencyNumber(item.totalBalance)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default observer(BankAccountList)
