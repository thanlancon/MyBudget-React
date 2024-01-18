import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import "react-datepicker/dist/react-datepicker.css";
import { NIL as NIL_UUID } from 'uuid';
import "../../../../public/myfunctions"
import { dateToString } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";

function TransactionDetails() {

    const { transactionStore, readOnlyListStore } = useStore();
    const { selectedItem } = transactionStore;

    const { bankAccounts, envelopes, payees } = readOnlyListStore;

    var itemDetail = selectedItem ?? {
        id: NIL_UUID,
        transactionTransferID: NIL_UUID,
        transactionDate: null,
        postDate: null,
        bankId: NIL_UUID,
        bankId_Transfer: NIL_UUID,
        payeeId: NIL_UUID,
        envelopeId: NIL_UUID,
        inflow: 0,
        outflow: 0,
        isCleared: false,
        totalBalance: 0,
        note: ''
    }
    async function  clickDelete() {
        const confirmtext = prompt("Type 'yes' to confirm if you want to delete transaction!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            if (selectedItem) {
                const response = await transactionStore.deleteItem(selectedItem?.id);
                if (response.isSuccess) {
                    handleServerResponse(response);
                }
            }
        }
    }
    return (
        <form className='defaultform'>
            <fieldset>
                <div className="transactionform">
                    <div className='flexcolumn'>
                        <label>Transaction Date</label>
                        <div className="tranInput">
                            <input type='text'
                                value={dateToString(itemDetail.transactionDate)}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label >Post Date</label>
                        <div className="tranInput">
                            <input type='text'
                                value={dateToString(itemDetail.postDate)}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='inflow'>Inflow</label>
                        <input name='inflow'
                            type='text'
                            placeholder='Inflow'
                            className='currencyinput'
                            value={itemDetail.inflow}
                            readOnly
                        />
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='outflow'>Outflow</label>
                        <div className="tranInput">
                            <input name='outflow' placeholder='Outflow'
                                className='currencyinput'
                                value={itemDetail.outflow}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='envelopeId'>Envelope</label>
                        <div className="tranInput">
                            <input type='text' name='envelopeId' value={envelopes.find(x => x.value === itemDetail.envelopeId)?.text}
                                readOnly
                            ></input>
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='payeeId'>Payee</label>
                        <div className="tranInput">
                            <input type='text' name='payeeId' value={payees.find(x => x.value === itemDetail.payeeId)?.text}
                                readOnly
                            ></input>
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='bankId'>Bank</label>
                        <div className="tranInput">
                            <input type='text' name='bankId' value={bankAccounts.find(x => x.value === itemDetail.bankId)?.text}
                                readOnly
                            ></input>
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='bankId_Transfer'>Bank Transfer</label>
                        <div className="tranInput">
                            <input type='text' name='bankId_Transfer' value={bankAccounts.find(x => x.value === itemDetail.bankId_Transfer)?.text}
                                readOnly
                            ></input>
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='outflow'>Note</label>
                        <textarea className='tranTextArea' name='note' placeholder='Note'
                            value={itemDetail.note ? itemDetail.note : ''}
                            readOnly
                        />
                    </div>
                </div>

            </fieldset >
            <div className='flexrow colgapxl'
                style={{ justifyContent: 'flex-start', alignContent: 'center' }}
            >
                <div className="fullwidth"></div>
                <button className='deletebutton buttonsm' type='button' style={{ width: 'min-content' }}
                    onClick={() => clickDelete()}
                >Delete</button>
                <div className="fullwidth"></div>
            </div>
        </form >
    )
}

export default observer(TransactionDetails)
