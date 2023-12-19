import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import BankAccountTypeList from "./bankAccountTypeList";
import LoadingComponent from "../../../app/layouts/common/loadingcomponent";
import { useEffect, useState } from "react";
import { PagingParams } from "../../../app/api/core/pagination";
import InfiniteScroll from "react-infinite-scroller";

function BankAccountTypeDashBoard() {
    const { bankAccountTypeStore } = useStore();
    const { isWaitingServerResponse } = bankAccountTypeStore;
    const { loadData, setPagingParams, pagination } = bankAccountTypeStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        bankAccountTypeStore.loadData(1, 100);
    }, [])

    function handleGetNextPage() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, 30));
        loadData().then(() => setLoadingNext(false));
    }

    return (
        <div className='dashboard'>
            {isWaitingServerResponse && <LoadingComponent />}
            <div className='dashboardtitle'>

            </div>
            <div className='dashboardcontent' >
                {
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNextPage}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                    useWindow={false}
                >
                    <BankAccountTypeList />
                </InfiniteScroll>}

            </div>
        </div>
    )
}

export default observer(BankAccountTypeDashBoard)
