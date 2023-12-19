import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler } from "react";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";

function BankAccountTypeList() {
    const { bankAccountTypeStore,floatedMenuStore } = useStore();
    const { bankAccountTypes, openForm, deleteItem } = bankAccountTypeStore;

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
    return (
        <>
            <table className='middletable'>
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
            </table>
        </>
    )
}
export default observer(BankAccountTypeList)
