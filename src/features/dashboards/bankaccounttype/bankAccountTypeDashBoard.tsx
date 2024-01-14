import { observer } from "mobx-react-lite"
import BankAccountTypeList from "./bankAccountTypeList";

function BankAccountTypeDashBoard() {
    return (
        <div className='dashboardcontent' >
                <BankAccountTypeList />
        </div>
    )
}

export default observer(BankAccountTypeDashBoard)
