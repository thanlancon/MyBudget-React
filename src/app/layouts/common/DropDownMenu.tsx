import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function DropDownMenu() {

    return (
            <Menu vertical>
                <div>
                <Link to={`envelopes`}><Button icon='home' floated='left' color='blue' ></Button></Link>
                </div>
                <div style={{paddingLeft:'30px'}}>
                <Dropdown item text='Budget'>
                    <Dropdown.Menu>
                        <Dropdown.Item ><Link to={`banks`}>Banks</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to={`bankaccounttypes`}>Bank Account Types</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to={`categories`}>Categories</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to={`payees`}>Payees</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </Menu>
    )

}
