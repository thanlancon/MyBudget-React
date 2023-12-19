import React, { useState } from 'react';
import { useStore } from '../../../app/api/stores/stores';
import { observer } from 'mobx-react-lite';
import handleServerResponse, { handleError } from '../../../app/api/handleresponemessage';

export default observer(function BankForm() {
    const { bankStore } = useStore();
    const { selectedBank, createBank, updateBank } = bankStore;

    var initialBank = selectedBank ?? {
        id: '',
        code: '',
        name: '',
        clearedBalance: 0,
        unClearedBalance: 0,
        totalBalance: 0
    }
    const [bank, SetBank] = useState(initialBank);

    function onChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        SetBank({ ...bank, [name]: value });
    }
    async function handleSubmit() {
        try {

            if (bank.id) {
                const response = await updateBank(bank);
                handleServerResponse(response);
            }
            else {
                const response = await createBank(bank);
                if (response.isSuccess) {
                    bankStore.setSelectedBank();
                }
                handleServerResponse(response);
            }
        } catch (error) {
            handleError(error);
        }
    }
    return (
        <div className='bankform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='bankLabel' htmlFor='code'>Code</label>
                        <input className='bankInput' placeholder='Bank Code' value={bank.code} name='code' onChange={onChangeEvent} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='bankLabel' htmlFor='name'>Name</label>
                        <input className='bankInput' placeholder='Bank Name' value={bank.name} name='name' onChange={onChangeEvent} />
                    </div>
                </fieldset>
                <div className='oneButton'>
                    <button className='save' type='button' onClick={handleSubmit} >Save</button>
                </div>
            </form>
        </div>
    )
})
