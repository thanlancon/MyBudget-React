import { useEffect } from 'react'
import { useStore } from '../api/stores/stores';
import { observer } from 'mobx-react-lite';
import DropDownMenu from './common/DropDownMenu';
import { UserFormValues } from '../models/user';
import Modalform from './common/modalform';
import ModalMenu from './common/modalMenu';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import BudgetMonth from './common/BudgetMonth';

function App() {

  const { userStore } = useStore();
  const navigate = useNavigate();


  useEffect(() => {
    const creds: UserFormValues = {
      email: 'tom@test.com',
      password: 'Pa$$w0rd',
      displayName: 'Tom',
      username: 'tom'
    };
    userStore.login(creds);
  }, [userStore])

  useEffect(() => {
    navigate('envelopes');
  }, [])


  return (
    <div className='flexcolumn fullwidth appframe'>
      <div className='mainbody'>
        <Modalform />
        <ModalMenu />
        <div className='flexrow mainpagebackground maintopnav'>
          <div  className='max-content-width'>
            <DropDownMenu />
          </div>
          <div className='flexrow fullwidth'
           >
            <BudgetMonth />
          </div>
        </div>
        <div className='divider'></div>
        <div className='flexcolumn mainpagebackground fullwidth'>
          <div className='middlecontent'>
            <Outlet />
          </div>

        </div >
      </div>
    </div>
  )
}

export default observer(App)
