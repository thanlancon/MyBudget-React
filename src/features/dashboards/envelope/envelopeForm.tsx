import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { DropdownProps, Select } from "semantic-ui-react";
import { useState } from "react";
import handleServerResponse, { handleError } from "../../../app/api/handleresponemessage";
import { NIL as NIL_UUID } from "uuid";

function EnvelopeForm() {

    const { envelopeStore, readOnlyListStore } = useStore();
    const { selectedItem
        , createItem, updateItem } = envelopeStore;

    const { categories, envelopes } = readOnlyListStore;

    var initialItem = {
        id: '',
        categoryId: '',
        name: '',
        description: '',
        totalBalance: 0,
        envelopeId_Funding: NIL_UUID
    }

    const [statedItem, setStatedItem] = useState(selectedItem ? selectedItem : initialItem);
    async function handleSubmit() {
        try {
            if (statedItem.id) {
                const response = await updateItem(statedItem);
                handleServerResponse(response);
            }
            else {
                const response = await createItem(statedItem);
                if (response.isSuccess) {
                    envelopeStore.setSelectedItem();
                }
                handleServerResponse(response);
            }
        } catch (error) {
            handleError(error);
        }
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });
    }
    function handleSelectedChange(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) {
        const { name, value } = data;
        event;
        setStatedItem({ ...statedItem, [name]: value ? value : NIL_UUID });
    }
    async function clickDelete() {
        if (!selectedItem) {
            return;
        }
        const confirmtext = prompt(`Type 'yes' to confirm if you want to delete envelope ${selectedItem.name} !!!`, 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await envelopeStore.deleteItem(selectedItem.id);
            if (response.isSuccess) {
                handleServerResponse(response);
            }
            else {
                handleError(response.error);
            }
        }
    }
    return (
        <div className='envelopeform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='enveLabel' htmlFor='name'>Envelope Name</label>
                        <input className='enveInput' name='name' placeholder='Name'
                            value={statedItem.name}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveLabel' htmlFor='categoryId'>Category</label>
                        <Select name='categoryId' placeholder='Select category' defaultValue={statedItem.categoryId} options={categories} onChange={handleSelectedChange}
                            clearable search />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveLabel' htmlFor='envelopeId_Funding'>Funded From</label>
                        <Select name='envelopeId_Funding' placeholder='Select envelope' defaultValue={statedItem.envelopeId_Funding} options={envelopes} onChange={handleSelectedChange}
                            clearable search />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveLabel' htmlFor='description'>Description</label>
                        <textarea className='enveTextArea' name='description' placeholder='Description'
                            value={statedItem.description}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveLabel' htmlFor='totalBalance'>Total Balance</label>
                        <input className='enveInput' disabled name='totalBalance' placeholder='Total Balance'
                            value={statedItem.totalBalance}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <div className='flexhorizontal'>
                    <button className='deletebutton buttonsm' type='button' onClick={clickDelete}>Delete</button>
                    <div className="fullwidth"></div>
                    <button className='savebutton buttonsm' type='button' onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div >
    )
}

export default observer(EnvelopeForm)
