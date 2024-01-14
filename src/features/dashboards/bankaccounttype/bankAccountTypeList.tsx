import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler, useEffect } from "react";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";

function BankAccountTypeList() {
    const { bankAccountTypeStore, floatedMenuStore, globalStore } = useStore();
    const { bankAccountTypes, openForm, deleteItem, pagination } = bankAccountTypeStore;

    useEffect(()=>{
        loadData();
    },[]);
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
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {bankAccountTypes.map(b => (
                        <tr key={b.id} onContextMenu={showMenu(b.id)}>
                            <td>{b.code}</td>
                            <td>{b.name}</td>

                        </tr>
                    ))}
                </tbody>
                <tfoot>
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
                </tfoot>
            </table>
        </>
    )
}
export default observer(BankAccountTypeList)
