import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import CategoryEnvelopes from "./categoryEnvelopes";

function EnvelopeList() {
    const {  readOnlyListStore } = useStore();
    const { categories } = readOnlyListStore;

    return (
        <div className='envelopelist'>
            <div className="envelopeListTitle">
                <div></div>
                <div>Balance Of Month</div>
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
