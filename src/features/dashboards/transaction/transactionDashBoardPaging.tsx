import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import LoadingComponent from "../../../app/layouts/common/loadingcomponent";
import TransactionList from "./transactionList";
import InfiniteScroll from 'react-infinite-scroller';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NIL as NIL_UUID } from "uuid";

function TransactionDashBoard() {
    const { transactionStore,globalStore } = useStore();
    const { isWaitingServerResponse } = transactionStore;
    const { loadData, pagination } = transactionStore;
    const [loadingNext, setLoadingNext] = useState(false);
    let { bankid } = useParams();

    useEffect(() => {
        transactionStore.bankID = bankid ? bankid : NIL_UUID;
    }, [bankid]);

    useEffect(()=>{
        transactionStore.loadData(1,globalStore.getDefaultItemPerPage);
    },[bankid]);
    
    const handleGetNextPage=()=> {
        setLoadingNext(true);
        loadData(pagination!.currentPage + 1, globalStore.getDefaultItemPerPage).then(() => setLoadingNext(false));
    }

    return (
        <div className='dashboard'>
            {isWaitingServerResponse && <LoadingComponent />}
            <div className='dashboardtitle'>

            </div>
            <div className='dashboardcontent' >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNextPage}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                    useWindow={false}
                    threshold={250}
                >
                    <TransactionList />
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default observer(TransactionDashBoard)
