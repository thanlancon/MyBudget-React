import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
                            <Dropdown.Item ><Link to={`banks`}>Banks</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={`bankaccounttypes`}>Bank Account Types</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={`categories`}>Categories</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to={`payees`}>Payees</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </div>
        </div>
    )

}
