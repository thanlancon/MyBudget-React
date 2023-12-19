import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { useEffect } from "react";
import CategoryEnvelopes from "./categoryEnvelopes";

function EnvelopeList() {
    const {  readOnlyListStore } = useStore();
    const { categories } = readOnlyListStore;
    useEffect(() => {
        readOnlyListStore.loadCategories();
    }, []);
    return (
        <div className='envelopelist'>
            <div className="envelopeListTitle">
                <div></div>
                <div>Monthly Balance</div>
                <div>Total Balance</div>
                <div></div>
            </div>
            <div className='body'>
                {categories.map(c => (
                    <CategoryEnvelopes category={c} key={c.value} />
                ))}
            </div>
        </div>
    )
}
export default observer(EnvelopeList)
