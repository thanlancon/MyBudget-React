import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler, useEffect } from "react";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";

function BankAccountTypeList() {
    const { bankAccountTypeStore, floatedMenuStore, globalStore } = useStore();
    const { bankAccountTypes, openForm, deleteItem, pagination } = bankAccountTypeStore;

    useEffect(() => {
        loadData();
    }, []);
    async function handleDelete(id: string) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to delete!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await deleteItem(id);

            handleServerResponse(response);
        }
    }
    const showMenu = (id: string): MouseEventHandler<HTMLDivElement> => (event) => {
        event.preventDefault();
        const createMenu = () => {
            openForm();
        };
        const editMenu = () => {
            openForm(id);
        };
        const deleteMenu = () => {
            handleDelete(id);
        }
        const x = event.pageX;
        const y = event.pageY;
        const menuItems: MenuItem[] = [
            { name: 'Create', action: createMenu },
            { name: 'Edit', action: editMenu },
            { name: 'Delete', action: deleteMenu },
        ];
        floatedMenuStore.openModal(x, y, menuItems);
    };
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
                {bankAccountTypes.map((item, index) => (
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
