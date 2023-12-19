import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useState } from "react";
import { NIL as NIL_UUID } from "uuid";
import handleServerResponse from "../../../app/api/handleresponemessage";

function PayeeForm({  reloadList = true }) {


    const { payeeStore } = useStore();
    const { selectedItem
        , createItem, updateItem } = payeeStore;


    payeeStore.reloadList = reloadList;

    var emptyItem = {
        id: '',
        name: '',
        description: '',
    }

    const [statedItem, setStatedItem] = useState(selectedItem ? selectedItem : emptyItem);

    async function handleSubmit() {
        if (statedItem.id !== '' && statedItem.id !== NIL_UUID) {
            const response = await updateItem(statedItem);
            handleServerResponse(response);
        }
        else {
            const response = await createItem(statedItem);
            setStatedItem(emptyItem);
            handleServerResponse(response);
        }
        
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });
    }
    return (
        <div className='payeeform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='payeelabel' htmlFor='name'>Name</label>
                        <input className='payeeInput' name='name' placeholder='Name'
                            value={statedItem.name}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='payeelabel' htmlFor='description'>Description</label>
                        <textarea className='payeeTextArea' name='description' placeholder='Description'
                            value={statedItem.description}
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

export default observer(PayeeForm)
