import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { dateToString, formatCurrencyNumber } from "../../../../public/myfunctions";

function MonthlyWithEnvelope() {
    const { monthlyTransactionStore, readOnlyListStore } = useStore();
    const { transactions } = monthlyTransactionStore;
    const { bankAccounts, payees } = readOnlyListStore;

    function isFutureDate(date: Date | undefined | null) {
        if (!date) return true;
        var inputDate = new Date(date);
        var currentDate = new Date(Date.now());
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        return inputDate.getTime() > currentDate.getTime();
    }
    return (
        <div>
            {transactions.length > 0 &&
                <table className='monthlyenvelope' >
                    <thead>
                        <tr>
                            <th>Tran. Date</th>
                            <th>Bank</th>
                            <th>Transfer Bank</th>
                            <th>Payee Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(b => (
                            <tr key={b.id} className={isFutureDate(b.transactionDate) ? 'futureTransaction' : 'currentTransaction'}>
                                <td>{dateToString(b.transactionDate)}</td>
                                <td>{bankAccounts.find(x => x.value === b.bankId)?.text}</td>
                                <td>{bankAccounts.find(x => x.value === b.bankId_Transfer)?.text}</td>
                                <td>{payees.find(x => x.value === b.payeeId)?.text}</td>
                                <td>{formatCurrencyNumber(b.inflow - b.outflow)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}
export default observer(MonthlyWithEnvelope)
