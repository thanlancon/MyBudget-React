import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    private _userToken = 'jwt';
    private _token: string | null = localStorage.getItem(this._userToken);
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this._token,
            token => {
                if (token) {
                    localStorage.setItem(this._userToken, token)
                } else {
                    localStorage.removeItem(this._userToken)
                }
            }
        )
    }

    setToken = (token: string | null) => {
        this._token = token;
    }
    get Token(){
        return this._token;
    }
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}
