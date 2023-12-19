import { useStore } from "../../api/stores/stores";
import { observer } from "mobx-react-lite";
import FloatedMenu from "./FloatedMenu";

export default observer(function ModalMenu() {
    const {floatedMenuStore}=useStore();

    function handleCloseMenu() {
        floatedMenuStore.closeModal();
    }

    return (
        floatedMenuStore.isOpen && <div className={floatedMenuStore.className}
            style={{ top: floatedMenuStore.y, left: floatedMenuStore.x }}
            onMouseLeave={handleCloseMenu}
        >
            <FloatedMenu/>
        </div>
    )
})
