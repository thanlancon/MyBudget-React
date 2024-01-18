import { observer } from "mobx-react-lite"
import BankAccountTypeList from "./bankAccountTypeList";

function BankAccountTypeDashBoard() {
    return (
        <div className="flexcolumn fullwidth">
            <div className="fullwidth dashboardtitle textcenter">Bank Account Types</div>
            <div className="flexrow fullwidth" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <BankAccountTypeList />
            </div>
        </div>
    )
}

export default observer(BankAccountTypeDashBoard)
