import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { dateToString, formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import { MouseEventHandler } from "react";
import TransactionForm from "./transactionForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";

function TransactionList() {

    const { transactionStore, readOnlyListStore, modalFormStore, floatedMenuStore, globalStore } = useStore();
    const { transactions, deleteItem, pagination } = transactionStore;
    const { bankAccounts, payees, envelopes } = readOnlyListStore;

    function loadTransactions(pageNumber: number = 1) {
        transactionStore.loadData(pageNumber, globalStore.getDefaultItemPerPage);
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
    function handlePageChanged(event: React.MouseEvent, data: PaginationProps) {
        loadTransactions(parseInt(data.activePage ? data.activePage?.toString() : '1'));
    }
    return (
        <>
            <table className='middletable autowidth' >
                <thead className='dashboardthead'>
                    <tr>
                        <th>Tran. Date</th>
                        <th>Post. Date</th>
                        <th>Bank</th>
                        <th>Transfer Bank</th>
                        <th>Payee Name</th>
                        <th>Envelope Name</th>
                        <th>Activity</th>
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
                            <td className={(b.inflow - b.outflow) < 0 ? 'negativecurrency' : 'possitivecurrency'}>{formatCurrencyNumber(b.inflow - b.outflow)}</td>
                            <td>{formatCurrencyNumber(b.totalBalance)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot >
                    <div style={{ width: '100%' , display: 'flex', justifyContent: 'center' }}>
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
export default observer(TransactionList)
