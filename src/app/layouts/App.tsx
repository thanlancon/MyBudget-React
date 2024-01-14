import { useEffect } from 'react'
import { useStore } from '../api/stores/stores';
import { observer } from 'mobx-react-lite';
import BankAccountQuickView from '../../features/dashboards/bankaccount/bankAccountQuickView';
import DropDownMenu from './common/DropDownMenu';
import { UserFormValues } from '../models/user';
import Modalform from './common/modalform';
import ModalMenu from './common/modalMenu';
import { Outlet } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import BudgetMonth from './common/BudgetMonth';
import MonthlyWithEnvelope from '../../features/dashboards/transaction/MonthlyWithEnvelope';
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
    <>
      <Modalform />
      <ModalMenu />
      <div className='flexrow mainpagebackground maintopnav'>
        <div className='left' >
          <DropDownMenu />
        </div>
        <div className='middle flexrow' style={{ justifyContent: 'right', marginRight: '3rem' }}>
          <BudgetMonth />
        </div>
        <div className='right'></div>
      </div>
      <div className='divider'></div>
      <div className='flexrow mainpagebackground'>
        <div className='left leftcontent' >
          <BankAccountQuickView />
        </div>
        <div className='middle flexrow middlecontent'>
          <Outlet />
        </div>
        <div className='right flexrow rightcontent'>
          {globalStore.isShowMonthlyTransaction
            && <MonthlyWithEnvelope />}
        </div>
      </div >
    </>
  )
}

export default observer(App)
