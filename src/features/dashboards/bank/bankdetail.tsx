import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Card } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/stores';


export default observer(function BankDetail() {
    const { bankStore } = useStore();
    const { selectedBank ,closeViewDetail} = bankStore;
    if (!selectedBank) {
        return (<></>)
    }
    return (
        <Card>
            <Card.Content>
                <Card.Header><strong>{selectedBank.code}</strong></Card.Header>
                <Card.Meta>{selectedBank.name}</Card.Meta>
                <Card.Content extra>
                    <ButtonGroup widths='2' size='mini'>
                        <div className='ui two buttongs'>
                            <Button onClick={closeViewDetail} basic floated='right' color='green' >Close</Button>
                        </div>
                    </ButtonGroup>
                </Card.Content>
            </Card.Content>
        </Card>
    )
})
