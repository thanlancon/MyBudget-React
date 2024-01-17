import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { RouterURL } from '../../api/routers/routerURL';

export default function DropDownMenu() {

    return (
        <div className='topmenu'>
            <div >
                <Link to={`envelopes`}><Button icon='home' floated='left' color='blue' ></Button></Link>
            </div>
            <div>
                <Menu vertical >
                    <Dropdown item text='Menu'>
                        <Dropdown.Menu>
                            <Dropdown.Item ><Link to={RouterURL.pathBankAccounts}>Bank Accounts</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={RouterURL.pathBankAccountTypes}>Bank Account Types</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={RouterURL.pathCategories}>Categories</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={RouterURL.pathPayees}>Payees</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </div>
        </div>
    )

}
