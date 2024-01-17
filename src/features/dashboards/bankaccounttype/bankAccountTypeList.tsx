import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useEffect } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";

function BankAccountTypeList() {
    const { bankAccountTypeStore, globalStore } = useStore();
    const { bankAccountTypes, pagination } = bankAccountTypeStore;

    useEffect(() => {
        loadData();
    }, []);

    function loadData(pageNumber: number = 1) {
        bankAccountTypeStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    function handlePageChanged(event: React.MouseEvent, data: PaginationProps) {
        loadData(parseInt(data.activePage ? data.activePage?.toString() : '1'));
    }
    return (
        <div className="flexvertical fullwidth">
            <div className="grid gridcol2 table">
                <div className="tabletitle titletext">Name</div>
                <div className="tabletitle titletext">Balance</div>
                {bankAccountTypes.map((item) => (
                    <>
                        <div className="hover">{item.code}</div>
                        <div className="flexhorizontal flexmiddleright">
                            {item.name}
                        </div>
                    </>
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
export default observer(BankAccountTypeList)
