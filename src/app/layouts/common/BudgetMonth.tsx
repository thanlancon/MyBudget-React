import { observer } from "mobx-react-lite";
import {  Select } from "semantic-ui-react";

function BudgetMonth() {
    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }))
    // function handleMonthChange(event:React.SyntheticEvent<HTMLElement,Event>,data:DropdownProps){

    // }
    return (
        <>
            <label>Month</label>
            <Select options={months} name='value'  ></Select>
        </>
    );
}
export default observer(BudgetMonth);
