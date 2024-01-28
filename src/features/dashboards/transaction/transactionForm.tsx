import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { Button, DropdownProps, Form, Icon, Modal, ModalContent } from "semantic-ui-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NIL as NIL_UUID } from 'uuid';
import "../../../../public/myfunctions"
import { convertToDate } from "../../../../public/myfunctions";
import PayeeForm from "../payee/payeeForm";
import handleServerResponse from "../../../app/api/handleresponemessage";

function TransactionForm() {

    const { transactionStore, readOnlyListStore } = useStore();
    const { selectedItem
        , createItem, setSelectedItem } = transactionStore;

    const { bankAccounts, envelopes, payees } = readOnlyListStore;

    const [openPayeeForm, setOpenPayeeForm] = useState(false);

    var emptyTransaction = {
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
        sequenceNumber: 0,
        note: ''
    }

    const [statedItem, setStatedItem] = useState(selectedItem ? selectedItem : emptyTransaction);

    const [transactionDate, setTransactionDate] = useState(convertToDate(statedItem.transactionDate));
    const [postDate, setPostDate] = useState(convertToDate(statedItem.postDate));
    const [isInflow, setIsInflow] = useState(true);

    async function handleSubmit() {
        statedItem.transactionDate = transactionDate ? new Date(transactionDate.toDateString()) : null;
        statedItem.postDate = postDate ? new Date(postDate.toDateString()) : null;
        if (statedItem.id === NIL_UUID) {
            const response = await createItem(statedItem);
            if (response.isSuccess) {
                setSelectedItem();
            }
            handleServerResponse(response);
        }
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setStatedItem({ ...statedItem, [name]: value });
    }
    function handleSelect(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) {
        event;
        const { name, value } = data;
        setStatedItem({ ...statedItem, [name]: value ? value : NIL_UUID });
    }
    function handleClosePayeeForm() {
        readOnlyListStore.loadPayees(true);
        setOpenPayeeForm(false);
    }
    function handleAddPayee() {
        setOpenPayeeForm(true);
    }
    function clickAmount() {
        setStatedItem({ ...statedItem, inflow: 0, outflow: 0 });
        setIsInflow(!isInflow);

    }
    return (
        <form className='defaultform' >
            <fieldset>
                <div className="transactionform">
                    <div className='flexcolumn'>
                        <label>Transaction Date</label>
                        <DatePicker
                            selected={transactionDate}
                            onChange={(date) => setTransactionDate(date)}
                        />
                    </div>
                    <div className='flexcolumn'>
                        <label >Post Date</label>
                        <DatePicker
                            selected={postDate}
                            onChange={(date) => setPostDate(date)}
                        />
                    </div>
                    <div className='flexcolumn fullwidth'>
                        <label
                            className={`hover ${isInflow ? 'possitivecurrency' : 'negativecurrency'}`}
                            onClick={clickAmount}>{isInflow ? '$$$ IN' : ''}{'(click to change)'}{isInflow ? '' : ' $$$ OUT'}</label>
                        <div className="fullwidth">
                            {isInflow && <input name='inflow'
                                type='text'
                                placeholder='Inflow'
                                className='possitivecurrency'
                                value={statedItem.inflow}
                                onChange={handleInputChange} />}
                            {!isInflow &&
                                <input name='outflow' placeholder='Outflow'
                                    className='negativecurrency'
                                    value={statedItem.outflow}
                                    onChange={handleInputChange} />
                            }
                        </div>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='envelopeId'>Envelope</label>
                        <Form.Select search clearable name='envelopeId' placeholder="Select Envelope" defaultValue={statedItem.envelopeId} options={envelopes} onChange={handleSelect}></Form.Select>
                    </div>

                    <div className='flexcolumn'>
                        <div className="flexrow">
                            <label htmlFor='payeeId'>Payee</label>
                            <button className='buttonplus' type='button' onClick={() => handleAddPayee()}>+</button>
                        </div>
                        <Form.Select search clearable name='payeeId' placeholder="Select Payee" defaultValue={statedItem.payeeId} options={payees} onChange={handleSelect}></Form.Select>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='bankId'>Bank</label>
                        <Form.Select search clearable name='bankId' placeholder="Select bank" defaultValue={statedItem.bankId} options={bankAccounts} onChange={handleSelect}></Form.Select>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='bankId_Transfer'>Bank Transfer</label>
                        <Form.Select search clearable name='bankId_Transfer' placeholder="Select bank transfer" defaultValue={statedItem.bankId_Transfer} options={bankAccounts} onChange={handleSelect}></Form.Select>
                    </div>
                    <div className='flexcolumn'>
                        <label htmlFor='outflow'>Note</label>
                        <textarea className='tranTextArea' name='note' placeholder='Note'
                            value={statedItem.note ? statedItem.note : ''}
                            onChange={handleInputChange} />

                    </div>
                </div>
            </fieldset>
            <div>
                <div className='flexcolumn'>
                    <div className="fullwidth"></div>
                    <button className='savebutton buttonsm' type='button' onClick={handleSubmit}>Save</button>
                </div>

                <Modal className='payeeFormModal'
                    open={openPayeeForm}
                    onOpen={() => setOpenPayeeForm(true)}
                >
                    <ModalContent>
                        <PayeeForm reloadList={false} />
                    </ModalContent>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={handleClosePayeeForm}>
                            <Icon name='checkmark' /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

            </div>
        </form>
    )
}

export default observer(TransactionForm)
