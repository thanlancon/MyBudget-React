import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { dateToString, formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import TransactionForm from "./transactionForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { Pagination, PaginationProps } from "semantic-ui-react";
import { MouseEventHandler } from "react";

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
        <div className="flexcolumn fullwidth">
            <div className="grid transactionheader">
                <div>Tran. Date</div>
                <div>Post. Date</div>
                <div>Bank</div>
                <div>Transfer Bank</div>
                <div>Payee Name</div>
                <div>Envelope Name</div>
                <div style={{ textAlign: 'right' }}>Activity</div>
                <div style={{ textAlign: 'right' }}>Total Balance</div>
            </div>
            <div className="flexcolumn">
                {transactions.map((b, index) => (
                    <div key={b.id} onContextMenu={showMenu(b.id)} className={`grid transactionrow ${(index % 2 ===0?'evenrowcolor':'oddrowcolor') } ${isFutureDate(b.transactionDate) ? 'futureTransaction' : 'currentTransaction'}`}>
                        <div style={{ paddingLeft: '1rem' }} className="gridcellmiddleleft transactioncell" >{dateToString(b.transactionDate)}</div>
                        <div className="gridcellmiddleleft transactioncell">{dateToString(b.postDate)}</div>
                        <div className="gridcellmiddleleft transactioncell">{bankAccounts.find(x => x.value === b.bankId)?.text}</div>
                        <div className="gridcellmiddleleft transactioncell">{bankAccounts.find(x => x.value === b.bankId_Transfer)?.text}</div>
                        <div className="gridcellmiddleleft transactioncell">{payees.find(x => x.value === b.payeeId)?.text}</div>
                        <div className="gridcellmiddleleft transactioncell">{envelopes.find(x => x.value === b.envelopeId)?.text}</div>
                        <div className={`cellnumber gridcellmiddleright transactioncell ${(b.inflow - b.outflow) < 0 ? 'negativecurrency' : 'possitivecurrency'}`}>{formatCurrencyNumber(b.inflow - b.outflow)}</div>
                        <div className='cellnumber gridcellmiddleright transactioncell'>{formatCurrencyNumber(b.totalBalance)}</div>
                    </div>
                ))}
            </div>
            <div >
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
        </div>
    )
}
export default observer(TransactionList)
