import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../../models/user";
import { store } from "./stores.ts";
import agent from "../agent.ts";
import { handleError } from "../handleresponemessage.ts";

export default class UserStore {
    user: User | null = null;


    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const result = await agent.Account.login(creds);
            if (result.isSuccess) {
                if (result.data) {
                    const user = result.data;
                    store.commonStore.setToken(user.token);
                    runInAction(() => this.user = user);
                }
            }
            else {
                store.commonStore.setToken(null);
                runInAction(() => this.user = null);
            }
        } catch (error) {
            handleError(error);
        }
    }
    getUser = async () => {
        try {
            const result = await agent.Account.current();
            if (result.isSuccess) {
                const user = result.data ? result.data : null;
                runInAction(() => this.user = user);
            }
        } catch (error) {
            handleError(error);
        }
    }

}
