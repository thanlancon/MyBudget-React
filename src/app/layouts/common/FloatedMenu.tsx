import { Menu } from "semantic-ui-react";
import { useStore } from "../../api/stores/stores";


export default function FloatedMenu() {
    const {floatedMenuStore}=useStore();
    const {menuItems}=floatedMenuStore;
    return (
        <Menu vertical >
            {menuItems && menuItems.map((x) => (
                <Menu.Item
                    name='createMenu'
                    onClick={x.action}
                >
                    {x.name}
                </Menu.Item>
            ))}
        </Menu>);
}
