import { observer } from "mobx-react-lite"
import PayeeList from "./payeeList";

function EnvelopeDashBoard() {
    return (
        <div className="flexcolumn fullwidth">
            <div className="fullwidth dashboardtitle textcenter">Payees</div>
            <div className="flexrow fullwidth" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <PayeeList />
            </div>
        </div>
    )
}
export default observer(EnvelopeDashBoard)
