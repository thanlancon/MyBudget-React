import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useStore } from "../../api/stores/stores";
import '../css/common.css';

function BudgetMonth() {
    const { globalStore } = useStore();
    const [selectedDate, setSelelectedDate] = useState(globalStore.budgetDate);
    
    useEffect(() => {
        globalStore.budgetDate = selectedDate;
    }, [globalStore.budgetDate, selectedDate]);

    return (
        <>
            <div className="budgetMonthYearLabel">
                <label>Budget Month</label>
            </div>
            <div>
                <DatePicker
                    className="budgetMonthYear"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    dateFormat={'MM/yyyy'}
                    selected={selectedDate}
                    placeholderText="Select Budget Month"
                    onChange={(date) => setSelelectedDate(date)}
                />
            </div>
        </>
    );
}
export default observer(BudgetMonth);
