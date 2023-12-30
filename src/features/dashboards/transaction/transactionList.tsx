import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { dateToString, formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler } from "react";
import TransactionForm from "./transactionForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";

function TransactionList() {

    const { transactionStore, readOnlyListStore, modalFormStore, floatedMenuStore,globalStore } = useStore();
    const { transactions, deleteItem } = transactionStore;
    const { bankAccounts, payees, envelopes } = readOnlyListStore;

    function loadTransactions() {
        transactionStore.loadData(1, globalStore.getDefaultItemPerPage);
    }
    function isFutureDate(date: Date | undefined | null) {
        if (!date) return true;
        var inputDate = new Date(date);
        var currentDate = new Date(Date.now());
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        return inputDate.getTime() > currentDate.getTime();
    }
    async function handleDelete(id: string) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to delete!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await deleteItem(id);
            if (response.isSuccess) {
                loadTransactions();
            }
            handleServerResponse(response);
        }
    }
    function handleOpenForm(id: string = NIL_UUID) {
        transactionStore.setSelectedItem(id);
        modalFormStore.openModal(<TransactionForm />, 'transactionmodal');
    }
    const showMenu = (id: string): MouseEventHandler<HTMLDivElement> => (event) => {
        event.preventDefault();
        const createMenu = () => {
            handleOpenForm();
        };
        const editMenu = () => {
            // handleOpenForm(id);
            alert('Transaction cannot be modified!');
        };
        const deleteMenu = () => {
            handleDelete(id);
        }
        const x = event.pageX;
        const y = event.pageY;
        const menuItems: MenuItem[] = [
            { name: 'Create', action: createMenu },
            { name: 'Edit', action: editMenu },
            { name: 'Delete', action: deleteMenu }
        ];
        floatedMenuStore.openModal(x, y, menuItems);
    };

    return (
        <>
            <table className='middletable autowidth' >
                <thead>
                    <tr>
                        <th>Tran. Date</th>
                        <th>Post. Date</th>
                        <th>Bank</th>
                        <th>Transfer Bank</th>
                        <th>Payee Name</th>
                        <th>Envelope Name</th>
                        <th>Inflow</th>
                        <th>Outflow</th>
                        <th>Total Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(b => (
                        <tr key={b.id} onContextMenu={showMenu(b.id)} className={isFutureDate(b.transactionDate) ? 'futureTransaction' : 'currentTransaction'}>
                            <td>{dateToString(b.transactionDate)}</td>
                            <td>{dateToString(b.postDate)}</td>
                            <td>{bankAccounts.find(x => x.value === b.bankId)?.text}</td>
                            <td>{bankAccounts.find(x => x.value === b.bankId_Transfer)?.text}</td>
                            <td>{payees.find(x => x.value === b.payeeId)?.text}</td>
                            <td>{envelopes.find(x => x.value === b.envelopeId)?.text}</td>
                            <td>{formatCurrencyNumber(b.inflow)}</td>
                            <td>{formatCurrencyNumber(b.outflow)}</td>
                            <td>{formatCurrencyNumber(b.totalBalance)}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default observer(TransactionList)
