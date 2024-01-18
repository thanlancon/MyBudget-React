import BankList from './banklist';
import { observer } from 'mobx-react-lite';

export default observer(function BankDashBoard() {

    return (
        <BankList />
    )
})
