import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler } from "react";
import PayeeForm from "./payeeForm";
import {NIL as NIL_UUID} from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";

function PayeeList() {
    const { payeeStore, floatedMenuStore,modalFormStore } = useStore();
    const { payees, deleteItem } = payeeStore;

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
    return (
        <table className='middletable'>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {payees.map(b => (
                    <tr key={b.id} onContextMenu={showMenu(b.id)}>
                        <td>{b.name}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default observer(PayeeList)
