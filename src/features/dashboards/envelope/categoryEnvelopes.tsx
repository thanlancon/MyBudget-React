import { observer } from "mobx-react-lite"
import ValueAndText from "../../../app/models/valueandtext"
import { MouseEventHandler, useState } from "react";
import { formatCurrencyNumber } from "../../../../public/myfunctions";
import handleServerResponse from "../../../app/api/handleresponemessage";
import { useStore } from "../../../app/api/stores/stores";
import CategoryForm from "../category/categoryForm";
import { NIL as NIL_UUID } from "uuid";
import { MenuItem } from "../../../app/api/stores/floatedMenuStore";
import { RouterURL } from "../../../app/api/routers/routerURL";
import { useNavigate } from "react-router-dom";

interface Props {
    category: ValueAndText
}
function CategoryEnvelopes({ category }: Props) {
    const { envelopeStore, categoryStore, modalFormStore, floatedMenuStore } = useStore();
    const { envelopes, monthlyEnvelopeBalances, setSelectedItem } = envelopeStore;
    const [showEnvelopes, setShowEnvelopes] = useState(true);
    const navigate = useNavigate();

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
    function clickEnvelopeName(id: string) {
        setSelectedItem(id);
        navigate(RouterURL.getEnvelopeEditURL());
    }
    return (
        <div className='flexvertical fullwidth'>
            <div className='categoryrow' key={category.value} onContextMenu={showCategoryMenu(category.value, category.text)}
                onClick={clickCategory}
            >{category.text}</div>
            <div className='enveloperow'
                key={`${category.value}-${category.value}`}
            >
                {showEnvelopes &&
                    envelopes.map((b) => (
                        b.categoryId === category.value &&
                        <>
                            <div className='name hover'
                                onClick={() => clickEnvelopeName(b.id)}
                            >{b.name}</div>
                            <div className='number'
                            >
                                {formatCurrencyNumber(FindMonthlyBalance(b.id))}
                            </div>
                            <div
                                className={`number ${b.totalBalance > 0 ? 'possitivecurrency' : b.totalBalance < 0 ? 'negativecurrency' : ''}`}
                            >
                                {formatCurrencyNumber(b.totalBalance)}
                            </div>
                        </>
                    ))
                }
            </div >
        </div>
    )
}
export default observer(CategoryEnvelopes)
