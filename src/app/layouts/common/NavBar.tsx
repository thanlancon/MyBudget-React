import { Container, Menu } from "semantic-ui-react";
import { useStore } from "../../api/stores/stores";

export default function NavBar() {

    const { mainDashBoardStore } = useStore();

    const { showBankDashBoard, showBankAccountTypeDashBoard, showCategoryDashBoard, showEnvelopeDashBoard
        , showPayeeDashBoard } = mainDashBoardStore;

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item name='banks' onClick={showBankDashBoard}>
                    Banks
                </Menu.Item>
                <Menu.Item name='bankAccountTypes' onClick={showBankAccountTypeDashBoard}>
                    Bank Account Types
                </Menu.Item>
                <Menu.Item name='categories' onClick={showCategoryDashBoard}>
                    Categories
                </Menu.Item>
                <Menu.Item name='envelope' onClick={showEnvelopeDashBoard}>
                    Envelopes
                </Menu.Item>
                <Menu.Item name='payee' onClick={showPayeeDashBoard}>
                    Payees
                </Menu.Item>
            </Container>
        </Menu>
    )
}
