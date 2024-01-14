import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { MouseEventHandler, useEffect } from "react";
import handleServerResponse from "../../../app/api/handleresponemessage";
import CategoryForm from "./categoryForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";

function CategoryList() {
    const { categoryStore, floatedMenuStore, modalFormStore, globalStore } = useStore();
    const { categories, deleteItem, pagination } = categoryStore;

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
    function handleOpenForm(id: string = NIL_UUID) {
        categoryStore.setSelectedItem(id);
        modalFormStore.openModal(<CategoryForm />, 'categorymodal');
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
        categoryStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
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
                    </tr>
                </thead>
                <tbody>
                    {categories.map(b => (
                        <tr key={b.id} onContextMenu={showMenu(b.id)}>
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
export default observer(CategoryList)
