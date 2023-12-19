import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useState } from "react";
import handleServerResponse, { handleError } from "../../../app/api/handleresponemessage";

function CategoryForm() {

    const { categoryStore } = useStore();
    const { selectedItem
        , createItem, updateItem } = categoryStore;

    var initialItem = selectedItem ?? {
        id: '',
        name: '',
        description: ''
    }

    const [statedItem, setStatedItem] = useState(initialItem);

    async function  handleSubmit() {
        statedItem.id ? updateItem(statedItem) : createItem(statedItem);
        try {
            if (statedItem.id) {
                const response = await updateItem(statedItem);
                handleServerResponse(response);
            }
            else {
                const response = await createItem(statedItem);
                if (response.isSuccess) {
                    setStatedItem(initialItem);
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
    return (
        <div className='categoryform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='categoryLabel' htmlFor='name'>Category Name</label>
                        <input className='categoryInput' name='name' placeholder='Name'
                            value={statedItem.name}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='categoryLabel' htmlFor='description'>Description</label>
                        <textarea className='categoryTextArea' name='description' placeholder='Description'
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

export default observer(CategoryForm)
