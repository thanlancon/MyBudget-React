import { useEffect } from 'react'
import { useStore } from '../api/stores/stores';
import { observer } from 'mobx-react-lite';
import BankAccountQuickView from '../../features/dashboards/bankaccount/bankAccountQuickView';
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
    <>
      <Modalform />
      <ModalMenu />
      <div className='mainpage'>
        <div className='toprow'>
          <DropDownMenu />
          <BudgetMonth />
        </div>
        <div className='mainleft' >
          <BankAccountQuickView />
        </div>
        <div className='mainmiddle'>
          <Outlet />
        </div>
        <div className='mainright'></div>
      </div>
    </>
  )
}

export default observer(App)
