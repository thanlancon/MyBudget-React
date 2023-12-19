import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useState } from "react";
import handleServerResponse from "../../../app/api/handleresponemessage";

function BankAccountTypeForm() {

    const { bankAccountTypeStore } = useStore();
    const { selectedItem
        , createItem, updateItem } = bankAccountTypeStore;

    var initialItem = selectedItem ?? {
        id: '',
        code: '',
        name: '',
    }

    const [statedItem, setStatedItem] = useState(initialItem);

    async function handleSubmit() {
        if (statedItem.id) {
            const response = await updateItem(statedItem)
            handleServerResponse(response);
        }
        else {
            const response = await createItem(statedItem);
            handleServerResponse(response);
        }
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });
    }
    return (
        <div className='bankaccounttypeform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='bankaccounttypeLabel' htmlFor='code'>Code</label>
                        <input className='bankaccounttypeInput' name='code' placeholder='Code'
                            value={statedItem.code}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='bankaccounttypeLabel' htmlFor='name'>Name</label>
                        <input className='bankaccounttypeInput' name='name' placeholder='Name'
                            value={statedItem.name}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <div className='oneButton'>
                    <button className='save' type='button' onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default observer(BankAccountTypeForm)
