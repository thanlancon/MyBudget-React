import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { NIL as NIL_UUID } from "uuid";
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import BankAccountForm from "./bankAccountForm";
import { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";

function BankAccountQuickView() {
    const { bankAccountStore, modalFormStore, floatedMenuStore } = useStore();
    const { bankAccounts, deleteItem } = bankAccountStore;

    useEffect(() => {
        bankAccountStore.loadData(1, 100);
    }, [bankAccountStore,bankAccountStore.loadData])

    async function handleDelete(id: string) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to delete!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await deleteItem(id);
            if (response.isSuccess) {
                bankAccountStore.loadData();
            }
            handleServerResponse(response);
        }
    }
    function handleOpenForm(id: string = NIL_UUID) {
        bankAccountStore.setSelectedItem(id);
        modalFormStore.openModal(<BankAccountForm />, 'bankaccountmodal');
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
        <div className='bankaccquickview'>
            <div className='title'>
                <div>
                    <h3>Bank Accounts</h3>
                </div>
                <div>
                    <button className='plus' onClick={() => handleOpenForm()} >+</button>
                </div>
            </div>
            <div className='listbanks'>
                {bankAccounts.map(b => (
                    <div className='row' key={b.id} onContextMenu={showMenu(b.id)}>
                        <div className='text' >
                            <Link className='bankaccountname' to={`transactions/bank/${b.id}`}>{b.code}</Link>
                        </div>
                        <div className='number'>
                            {formatCurrencyNumber(b.totalBalance)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default observer(BankAccountQuickView)
