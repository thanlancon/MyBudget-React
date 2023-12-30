import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { DropdownProps, Select } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default observer(function BankAccountForm() {

    const { bankAccountStore, readOnlyListStore } = useStore();
    const { createItem, updateItem } = bankAccountStore;
    const { banks, bankAccountTypes } = readOnlyListStore;

    
    var initialItem = {
        id: '',
        code: '',
        bankId: '',
        bankAccountTypeId: '',
        description: '',
        clearedBalance: 0,
        unClearedBalance: 0,
        totalBalance: 0
    }
    const [statedItem, setStatedItem] = useState(initialItem);

    useEffect(() => {

        setStatedItem(bankAccountStore.selectedItem ? bankAccountStore.selectedItem : initialItem);

    }, [bankAccountStore.selectedItem]);

    function handleSubmit() {
        statedItem.id ? updateItem(statedItem) : createItem(statedItem);
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });
    }

    function handleSelectedChange(event: React.SyntheticEvent<HTMLElement, Event>,data: DropdownProps) {
        event;
        const { name, value } = data;
        setStatedItem({ ...statedItem, [name]: value });
    }
    return (
        <div className='bankaccountform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label htmlFor='code'>Code</label>
                        <div className='bankaccountinput'>
                            <input type='text' name='code' placeholder='Code'
                                value={statedItem.code}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='bankID'>Bank Name</label>
                        <Select name='bankId' placeholder='Select bank' value={statedItem.bankId} options={banks} onChange={handleSelectedChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='bankAccountTypeId'>Bank Account Type</label>
                        <div className='bankaccountinput'>
                            <Select name='bankAccountTypeId' placeholder='Select account type' value={statedItem.bankAccountTypeId} options={bankAccountTypes} onChange={handleSelectedChange} />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='bankID'>Description</label>
                        <div className='bankaccountTextArea'>
                            <textarea name='description' placeholder='Description'
                                value={statedItem.description}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='clearBalance'>Clear Balance</label>
                        <div className='bankaccountinput'>
                            <input className='currencyinput' name='clearBalance' disabled value={statedItem.clearedBalance} />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='unClearBalance'>UnClear Balance</label>
                        <div className='bankaccountinput'>
                            <input className='currencyinput' name='unClearBalance' disabled value={statedItem.unClearedBalance} />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='totalBalance'>Total Balance</label>
                        <div className='bankaccountinput'>
                            <input className='currencyinput' name='totalBalance' disabled value={statedItem.totalBalance} />
                        </div>
                    </div>
                </fieldset>
                <div className='twoButton'>
                    <button className='save' type='button' onClick={handleSubmit} >Save</button>
                </div>
            </form>
        </div>
    )
})
