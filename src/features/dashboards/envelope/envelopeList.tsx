import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import CategoryEnvelopes from "./categoryEnvelopes";

function EnvelopeList() {
    const { readOnlyListStore } = useStore();
    const { categories } = readOnlyListStore;

    return (
        <div className="flexvertical fullwidth flexallmiddle">
            <div className="envelopeListTitle">
                <div >Balance Of Month</div>
                <div style={{ marginRight: '1rem' }}>Total Balance</div>
            </div>
            <div className='envelopelist flexvertical fullwidth'>
                <div className='envelopecontent'>
                    {categories.map(c => (
                        <CategoryEnvelopes category={c} key={c.value} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default observer(EnvelopeList)
