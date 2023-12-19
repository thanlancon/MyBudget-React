import { makeAutoObservable } from "mobx";

export default class ModalFormStore {
    isOpen = false;
    className: string = '';
    body: JSX.Element | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element, className = '') => {
        this.body = content;
        this.isOpen = true;
        this.className=className;
    }
    closeModal = () => {
        this.body = null;
        this.isOpen = false;
        this.className = '';
    }
}
