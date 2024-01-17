import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler, useEffect } from "react";
import PayeeForm from "./payeeForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";

function PayeeList() {
    const { payeeStore, floatedMenuStore, modalFormStore, globalStore } = useStore();
    const { payees, deleteItem, pagination } = payeeStore;

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
    function handleOpenForm(id: string = NIL_UUID) {
        payeeStore.setSelectedItem(id);
        modalFormStore.openModal(<PayeeForm />, 'payeeFormModal');
    }
    const showMenu = (id: string): MouseEventHandler<HTMLDivElement> => (event) => {
        event.preventDefault();
        const createMenu = () => {
            handleOpenForm();
        };
        const editMenu = () => {
            handleOpenForm(id);
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
        payeeStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    function handlePageChanged(event: React.MouseEvent, data: PaginationProps) {
        loadData(parseInt(data.activePage ? data.activePage?.toString() : '1'));
    }
    return (
        <div className="flexvertial fullwidth">
        <div className="grid gridcol1 table">
            <div className="tabletitle titletext">Name</div>
            {payees.map((item, index) => (
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
