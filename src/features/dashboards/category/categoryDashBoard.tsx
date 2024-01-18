import { observer } from "mobx-react-lite"
import CategoryList from "./categoryList";

function CategoryDashBoard() {
    return (
        <div className="flexcolumn fullwidth">
            <div className="fullwidth dashboardtitle textcenter">Categories</div>
            <div className="flexrow fullwidth" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <CategoryList />
            </div>
        </div>
    )
}

export default observer(CategoryDashBoard)
