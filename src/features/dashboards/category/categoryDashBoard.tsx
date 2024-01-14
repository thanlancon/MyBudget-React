import { observer } from "mobx-react-lite"
import CategoryList from "./categoryList";

function CategoryDashBoard() {
    return (
        <div className='dashboardcontent' >
           <CategoryList />
           </div>
    )
}

export default observer(CategoryDashBoard)
