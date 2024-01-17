import { useEffect } from 'react'
import { useStore } from '../api/stores/stores';
import { observer } from 'mobx-react-lite';
import DropDownMenu from './common/DropDownMenu';
import { UserFormValues } from '../models/user';
import Modalform from './common/modalform';
import ModalMenu from './common/modalMenu';
import { Outlet } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import BudgetMonth from './common/BudgetMonth';
import { RouterURL } from '../api/routers/routerURL';

function App() {

  const { userStore, globalStore, monthlyTransactionStore } = useStore();
  const navigate = useNavigate();
  const location = useLocation();


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

  useEffect(() => {
    if (location.pathname !== RouterURL.pathEnvelopes) {
      globalStore.setShowMonthlyTransaction(false);
      monthlyTransactionStore.clearTransactions();
    }
  }, [location.pathname]);
  return (
    <div className='mainbody'>
      <Modalform />
      <ModalMenu />
      <div className='flexhorizontal mainpagebackground maintopnav'>
        <div  >
          <DropDownMenu />
        </div>
        <div className='flexhorizontal flexallmiddle' >
          <BudgetMonth />
        </div>
      </div>
      <div className='divider'></div>
      <div className='flexhorizontal mainpagebackground'>

        <div className='middle flexhorizontal middlecontent'>
          <Outlet />
        </div>

      </div >
    </div>
  )
}

export default observer(App)
