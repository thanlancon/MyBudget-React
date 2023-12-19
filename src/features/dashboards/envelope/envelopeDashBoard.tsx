import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import LoadingComponent from "../../../app/layouts/common/loadingcomponent";
import EnvelopeList from "./envelopeList";
import { useEffect } from "react";


function EnvelopeDashBoard() {
    const { envelopeStore } = useStore();
    const { isWaitingServerResponse } = envelopeStore;


    useEffect(() => {
            envelopeStore.loadData(1, 1000);
            envelopeStore.loadMonthlyEnvelopeBalances(10,2023);
    }, [ envelopeStore]);
    return (
        <div className='dashboard'>
            {isWaitingServerResponse && <LoadingComponent />}
            <div className='dashboardtitle'>


            </div>
            <div className='dashboardcontent' >
                <EnvelopeList />
            </div>
        </div>
    )
}

export default observer(EnvelopeDashBoard)
