import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import "react-datepicker/dist/react-datepicker.css";
import { NIL as NIL_UUID } from 'uuid';
import "../../../../public/myfunctions"
import { dateToString } from "../../../../public/myfunctions";

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
    return (
        <div className='transactionform'>
            <form className='defaultform'>
                <fieldset>
                    <div className='formrowgroup'>
                        <div className='datepicker'>
                            <label>Transaction Date</label>
                            <div className="tranInput">
                                <input type='text'
                                    value={dateToString(itemDetail.transactionDate)}
                                />
                            </div>
                        </div>
                        <div className='datepicker '>
                            <label >Post Date</label>
                            <div className="tranInput">
                                <input type='text'
                                    value={dateToString(itemDetail.postDate)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='inflow'>Inflow</label>
                        <div className="tranInput">
                            <input name='inflow'
                                type='text'
                                placeholder='Inflow'
                                className='currencyinput'
                                value={itemDetail.inflow}
                            />
                        </div>
                        <label htmlFor='outflow'>Outflow</label>
                        <div className="tranInput">
                            <input name='outflow' placeholder='Outflow'
                                className='currencyinput'
                                value={itemDetail.outflow}
                            />
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='envelopeId'>Envelope</label>
                        <div className="tranInput">
                            <input type='text' name='envelopeId' value={envelopes.find(x => x.value === itemDetail.envelopeId)?.text}  ></input>
                        </div>
                        <label htmlFor='payeeId'>Payee</label>
                        <div className="tranInput">
                            <input type='text' name='payeeId' value={payees.find(x => x.value === itemDetail.payeeId)?.text}  ></input>
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='bankId'>Bank</label>
                        <div className="tranInput">
                            <input type='text' name='bankId' value={bankAccounts.find(x => x.value === itemDetail.bankId)?.text}  ></input>
                        </div>
                        <label htmlFor='bankId_Transfer'>Bank Transfer</label>
                        <div className="tranInput">
                            <input type='text' name='bankId_Transfer' value={bankAccounts.find(x => x.value === itemDetail.bankId_Transfer)?.text}  ></input>
                        </div>
                    </div>
                    <div className='formrowgroup'>
                        <label htmlFor='outflow'>Note</label>
                        <textarea className='tranTextArea' name='note' placeholder='Note'
                            value={itemDetail.note ? itemDetail.note : ''}
                        />
                    </div>
                </fieldset>
            </form>
        </div>

    )
}

export default observer(TransactionDetails)
