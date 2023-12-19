import { makeAutoObservable } from "mobx";

export interface MenuItem {
    name: string
    action: () => void
}
export interface FloatedMenuItems {
    menuItems: MenuItem[]
}
export default class FloatedMenuStore {
    x: number | undefined;
    y: number | undefined;
    isOpen = false;
    className: string = '';
    body: JSX.Element | null = null;
    createMenu: (() => void) | undefined;
    editMenu: (() => void) | undefined;
    deleteMenu: (() => void) | undefined;
    menuItems: MenuItem[] | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (x: number, y: number, menuItems: MenuItem[], className = 'defaultmodalmenu') => {
        this.isOpen = true;
        this.className = className;
        this.menuItems = menuItems;
        this.x = x;
        this.y = y;
    }
    closeModal = () => {
        this.body = null;
        this.isOpen = false;
        this.className = '';
        this.menuItems = undefined;
    }
}
