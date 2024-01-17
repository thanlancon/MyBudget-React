import { observer } from "mobx-react-lite"
import BankAccountList from "./bankAccountList"
import { useStore } from "../../../app/api/stores/stores"
import { useEffect } from "react";

function BankAccount(){
    const {bankAccountStore,globalStore}=useStore();

    useEffect(()=>{
        bankAccountStore.loadData(1,globalStore.getDefaultItemPerPage);
    },[]);
    return(
        <div className="flexvertical fullwidth flexallmiddle">
            <BankAccountList/>
        </div>
    )
}
export default observer(BankAccount)