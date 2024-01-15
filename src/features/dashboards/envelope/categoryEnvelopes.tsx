import { observer } from "mobx-react-lite"
import ValueAndText from "../../../app/models/valueandtext"
import { MouseEventHandler, useState } from "react";
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import { useStore } from "../../../app/api/stores/stores";
import CategoryForm from "../category/categoryForm";
import EnvelopeForm from "./envelopeForm";
import EnvelopeTransferFund from "./envelopeTransferFund";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";

interface Props {
    category: ValueAndText
}
function CategoryEnvelopes({ category }: Props) {
    const { envelopeStore, categoryStore, modalFormStore, floatedMenuStore, monthlyTransactionStore, globalStore } = useStore();
    const { envelopes, monthlyEnvelopeBalances, deleteItem, setSelectedItem } = envelopeStore;
    const [showEnvelopes, setShowEnvelopes] = useState(true);

    //handle envelope
    function handleFundTransfer(envelopeID = NIL_UUID) {
        setSelectedItem(envelopeID);
        modalFormStore.openModal(<EnvelopeTransferFund />, 'envelopeFundTransferModal');
    }
    async function autoZeroBalance(envelopeID = NIL_UUID) {
        const confirmtext = prompt("Type 'yes' to confirm if you want to zero the balance!!!", 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            await envelopeStore.autozerobalance(envelopeID);
        }
    }
    async function handleDeleteEnvelope(id: string, itemInfor: string) {
        const confirmtext = prompt(`Type 'yes' to confirm if you want to delete ${itemInfor}!!!`, 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await deleteItem(id);

            handleServerResponse(response);
        }
    }
    function handleOpenEnvelopeForm(id: string = NIL_UUID) {
        envelopeStore.setSelectedItem(id);
        modalFormStore.openModal(<EnvelopeForm />, 'envelopemodal');
    }
    const showEnvelopeMenu = (id: string, itemInfor: string = ''): MouseEventHandler<HTMLDivElement> => (event) => {
        return;
        event.preventDefault();
        const createMenu = () => {
            handleOpenEnvelopeForm();
            floatedMenuStore.closeModal();
        };
        const editMenu = () => {
            handleOpenEnvelopeForm(id);
            floatedMenuStore.closeModal();
        };
        const deleteMenu = () => {
            handleDeleteEnvelope(id, itemInfor);
            floatedMenuStore.closeModal();
        }
        const zeroBalance = () => {
            autoZeroBalance(id);
            floatedMenuStore.closeModal();
        }
        const transferBalance = () => {
            handleFundTransfer(id);
            floatedMenuStore.closeModal();
        }
        const x = event.pageX;
        const y = event.pageY;
        const menuItems: MenuItem[] = [
            { name: 'Create', action: createMenu },
            { name: 'Edit', action: editMenu },
            { name: 'Delete', action: deleteMenu },
            { name: 'Zero Balance', action: zeroBalance },
            { name: 'Transfer', action: transferBalance }

        ];
        floatedMenuStore.openModal(x, y, menuItems);
    }
    //end of handle envelope

    ///handle Category
    async function handleDeleteCategory(id: string, itemInfor: string = '') {
        const confirmtext = prompt(`Type 'yes' to confirm if you want to delete ${itemInfor}!!!`, 'no');
        if (confirmtext?.toLowerCase() === 'yes') {
            const response = await categoryStore.deleteItem(id);

            handleServerResponse(response);
        }
    }
    function handleOpenCategoryForm(id: string = NIL_UUID) {
        categoryStore.setSelectedItem(id);
        modalFormStore.openModal(<CategoryForm />, 'categorymodal');
    }
    const showCategoryMenu = (id: string, itemInfor: string = ''): MouseEventHandler<HTMLDivElement> => (event) => {
        event.preventDefault();
        const createMenu = () => {
            handleOpenCategoryForm();
            floatedMenuStore.closeModal();
        };
        const editMenu = () => {
            handleOpenCategoryForm(id);
            floatedMenuStore.closeModal();
        };
        const deleteMenu = () => {
            handleDeleteCategory(id, itemInfor);
            floatedMenuStore.closeModal();
        }
        const x = event.pageX;
        const y = event.pageY;
        const menuItems: MenuItem[] = [
            { name: 'Create', action: createMenu },
            { name: 'Edit', action: editMenu },
            { name: 'Delete', action: deleteMenu },
            { name: 'Expand All', action: () => console.log('Expand All') }
        ];
        floatedMenuStore.openModal(x, y, menuItems);
    }
    function clickCategory() {
        setShowEnvelopes(!showEnvelopes);
    }
    function FindMonthlyBalance(id: string) {
        var balance = 0;
        if (monthlyEnvelopeBalances && monthlyEnvelopeBalances.envelopeBalances) {
            balance = monthlyEnvelopeBalances.envelopeBalances.find(x => x.id === id)?.balance ?? 0;
        }
        return balance;
    }
    function handleEnvelopeNameClick(envelopeID: string) {
        return;
        const month = globalStore.getBudgetMonth;
        const year = globalStore.getBudgetYear;
        monthlyTransactionStore.clearTransactions();
        monthlyTransactionStore.loadData(month, year, envelopeID);
        globalStore.setShowMonthlyTransaction(true);
    }
    return (
        <>
            <div className='categoryrow' key={category.value} onContextMenu={showCategoryMenu(category.value, category.text)}
                onClick={clickCategory}
            >{category.text}</div>
            <div className='enveloperow'
            key={`${category.value}-${category.value}`}
            >
                {showEnvelopes &&
                    envelopes.map((b,index) => (
                        b.categoryId === category.value &&
                        // <div className='enveloperow' key={b.id}
                        //     onContextMenu={showEnvelopeMenu(b.id, b.name)}
                        //     onClick={() => handleEnvelopeNameClick(b.id)}
                        // >
                        <>
                            <div className='name'
                                onContextMenu={showEnvelopeMenu(b.id, b.name)}
                                onClick={() => handleEnvelopeNameClick(b.id)}
                            >{b.name}</div>
                            <div className='number'
                            >
                                {formatCurrencyNumber(FindMonthlyBalance(b.id))}
                            </div>
                            <div
                                className={`number ${b.totalBalance > 0 ? 'possitivecurrency' : b.totalBalance < 0 ? 'negativecurrency' : ''}`}
                                onClick={() => handleFundTransfer(b.id)}
                            >
                                {formatCurrencyNumber(b.totalBalance)}
                            </div>
                        </>
                        // </div >

                    ))
                }
            </div >
        </>
    )
}
export default observer(CategoryEnvelopes)
