import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores";
import LoadingComponent from "../../../app/layouts/common/loadingcomponent";
import CategoryList from "./categoryList";
import { useEffect, useState } from "react";
import { PagingParams } from "../../../app/api/core/pagination";
import InfiniteScroll from "react-infinite-scroller";

function CategoryDashBoard() {
    const { categoryStore ,globalStore} = useStore();
    const { isWaitingServerResponse } = categoryStore;
    const { loadData, setPagingParams, pagination } = categoryStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        categoryStore.loadData(1, globalStore.getDefaultItemPerPage);
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
                        <CategoryList />
                    </InfiniteScroll>
                }

            </div>
        </div>
    )
}

export default observer(CategoryDashBoard)
