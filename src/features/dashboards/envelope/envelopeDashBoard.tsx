import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import EnvelopeList from "./envelopeList";
import { useEffect } from "react";


function EnvelopeDashBoard() {
    const { envelopeStore, globalStore } = useStore();
    const { getBudgetMonth, getBudgetYear } = globalStore;

    useEffect(() => {
        envelopeStore.loadData(1, 1000);
        envelopeStore.loadMonthlyEnvelopeBalances(getBudgetMonth, getBudgetYear);
    }, [envelopeStore, getBudgetMonth, getBudgetYear]);
    return (
        <div className='dashboardcontent fullwidth' >
            <EnvelopeList />
        </div>
    )
}

export default observer(EnvelopeDashBoard)
