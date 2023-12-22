import BankList from './banklist';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/api/stores/stores';
import LoadingComponent from '../../../app/layouts/common/loadingcomponent';
import { useEffect, useState } from 'react';
import { PagingParams } from '../../../app/api/core/pagination';
import InfiniteScroll from 'react-infinite-scroller';



export default observer(function BankDashBoard() {
    const { bankStore,globalStore } = useStore();
    const { isWaitingServerResponse } = bankStore;

    const { loadData, setPagingParams, pagination } = bankStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        bankStore.loadData(1, globalStore.getDefaultItemPerPage);
    }, [])

    function handleGetNextPage() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, globalStore.getDefaultItemPerPage));
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
                        <BankList />
                    </InfiniteScroll>}
            </div>
        </div>
    )
})
