import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useEffect } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";

function PayeeList() {
    const { payeeStore, globalStore } = useStore();
    const { payees, pagination } = payeeStore;

    useEffect(() => {
        loadData();
    }, []);

    function loadData(pageNumber: number = 1) {
        payeeStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    function handlePageChanged(event: React.MouseEvent, data: PaginationProps) {
        loadData(parseInt(data.activePage ? data.activePage?.toString() : '1'));
    }
    return (
        <div className="flexvertial max-content-width">
            <div className="grid gridcol1 table">
                <div className="tabletitle titletext">Name</div>
                {payees.map((item) => (
                    <div className="hover">{item.name}</div>
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    boundaryRange={1}
                    defaultActivePage={pagination ? pagination.currentPage : 1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={pagination ? pagination.totalPages : 0}
                    onPageChange={handlePageChanged}

                />
            </div>
        </div>
    )
}
export default observer(PayeeList)
