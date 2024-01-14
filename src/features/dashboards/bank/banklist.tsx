import { useStore } from '../../../app/api/stores/stores';
import { observer } from 'mobx-react-lite';
import { MouseEventHandler, useEffect } from 'react';
import handleServerResponse from '../../../app/api/handleresponemessage';
import BankForm from './bankform';
import { NIL as NIL_UUID } from 'uuid';
import { MenuItem } from '../../../app/api/stores/floatedMenuStore';
import { Pagination, PaginationProps } from 'semantic-ui-react';

function BankList() {
    const { bankStore, floatedMenuStore, modalFormStore,globalStore } = useStore();
    const { banks,pagination } = bankStore;
    if (!banks) return (<></>);

    useEffect(()=>{
        loadData();
    },[]);
    async function handleDelete(id: string) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to delete!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await bankStore.deleteBank(id);

            handleServerResponse(response);
        }
    }
    function handleOpenForm(id: string = NIL_UUID) {
        bankStore.setSelectedBank(id);
        modalFormStore.openModal(<BankForm />, 'bankmodal');
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
        bankStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
    }
    function handlePageChanged(event: React.MouseEvent, data: PaginationProps) {
        loadData(parseInt(data.activePage ? data.activePage?.toString() : '1'));
    }
    return (
        <table className='middletable'>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {banks.map(b => (
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
    )
}
export default observer(BankList);
