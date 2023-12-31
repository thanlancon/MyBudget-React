import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/api/stores/stores";
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import { NIL as NIL_UUID } from "uuid";
import { useState } from "react";
import { DropdownProps, Select } from "semantic-ui-react";
import handleServerResponse, { handleError } from "../../../app/api/handleresponemessage";
import EnvelopeBalanceTransfer from "../../../app/models/envelopeBalanceTransfer";

function EnvelopeTransferFund() {
    const { envelopeStore, readOnlyListStore } = useStore();
    const { selectedItem } = envelopeStore;
    const { envelopes } = readOnlyListStore;

    const initialTransfer: EnvelopeBalanceTransfer = {
        envelopeID_From: selectedItem ? selectedItem.id : NIL_UUID,
        envelopeID_To: NIL_UUID,
        balanceTransfer: 0
    };
    const [statedItem, setStatedItem] = useState(initialTransfer);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });

    }
    function handleSelectChange(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) {
        event;
        const { name, value } = data;
        setStatedItem({ ...statedItem, [name]: value });
    }

    async function handleSubmit() {
        try {
            if (selectedItem) {
                const confirmtext = prompt("Type 'yes' to confirm if you want to transfer the balance!!!", 'no');
                if (confirmtext?.toLowerCase() === 'yes') {
                    const response = await envelopeStore.transferFund(statedItem);
                    if (response.isSuccess) {
                        handleServerResponse(response);
                        readOnlyListStore.loadEnvelopes();
                    }
                }
            }
            else {
                throw new Error("Envelope is not selected!");
            }
        } catch (error) {
            handleError(error);
        }
    }
    return (
        <div className='envelopeTransfer'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <label className='enveTransferLabel'>Current Balance</label>
                        <input className='enveTransferInput' disabled name='totalbalance'
                            value={formatCurrencyNumber(selectedItem?.totalBalance)} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveTransferLabel' htmlFor='balanceTransfer'>Transfer Amount</label>
                        <input className='enveTransferInput' name='balanceTransfer'
                            value={statedItem.balanceTransfer}
                            onChange={handleChange} />
                    </div>
                    <div className='formrowgroup'>
                        <label className='enveTransferLabel' htmlFor='envelopeID_To'>To Envelope</label>
                        <Select name='envelopeID_To' options={envelopes} onChange={handleSelectChange}></Select>
                    </div>

                </fieldset>
                <div className='oneButton'>
                    <button className='save' type='button' onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    )
}
export default observer(EnvelopeTransferFund)
