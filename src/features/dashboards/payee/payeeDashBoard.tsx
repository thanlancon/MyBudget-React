import { observer } from "mobx-react-lite"
import PayeeList from "./payeeList";

function EnvelopeDashBoard() {
    return (
        <div  >
            <PayeeList />
        </div>
    )
}
export default observer(EnvelopeDashBoard)
