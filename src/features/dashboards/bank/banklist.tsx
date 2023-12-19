import { useStore } from '../../../app/api/stores/stores';
import { observer } from 'mobx-react-lite';
import { MouseEventHandler } from 'react';
import handleServerResponse from '../../../app/api/handleresponemessage';
import BankForm from './bankform';
import { NIL as NIL_UUID } from 'uuid';
import { MenuItem } from '../../../app/api/stores/floatedMenuStore';

function BankList() {
    const { bankStore, floatedMenuStore, modalFormStore } = useStore();
    const { banks } = bankStore;
    if (!banks) return (<></>);

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
        </table>
    )
}
export default observer(BankList);
