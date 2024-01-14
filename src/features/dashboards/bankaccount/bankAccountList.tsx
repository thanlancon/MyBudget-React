import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/api/stores/stores"
import { Button, ButtonGroup } from "semantic-ui-react";

function BankAccountList() {
    const { bankAccountStore } = useStore();
    const { bankAccounts, openForm, deleteItem } = bankAccountStore;
    return (
        <table>
            <thead>
                <tr>
                    <th>Tran. Date</th>
                    <th>Post. Date</th>

                    <th></th>
                </tr>
            </thead>
            <tbody>
                {bankAccounts.map(b => (
                    <tr key={b.id}>
                        <td>
                            <a >{b.code}</a>
                        </td>
                        <td>
                            {b.totalBalance}
                        </td>
                        <td>
                            <ButtonGroup widths={2}>
                                <Button basic floated='right' icon='edit' color='blue'
                                    onClick={() => openForm(b.id)}
                                ></Button>
                                <Button basic floated='right' icon='delete' color='red'
                                    onClick={() => deleteItem(b.id)}
                                ></Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default observer(BankAccountList)
