import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import CategoryEnvelopes from "./categoryEnvelopes";

function EnvelopeList() {
    const {  readOnlyListStore } = useStore();
    const { categories } = readOnlyListStore;

    return (
        <div className='envelopelist'>
            <div className="envelopeListTitle">
                <div >Balance Of Month</div>
                <div >Total Balance</div>
            </div>
            <div className='body envelopecontent'>
                {categories.map(c => (
                    <CategoryEnvelopes category={c} key={c.value} />
                ))}
            </div>
        </div>
    )
}
export default observer(EnvelopeList)
