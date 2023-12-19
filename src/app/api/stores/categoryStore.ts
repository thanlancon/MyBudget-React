import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid4 } from 'uuid';
import Category from "../../models/category";
import Agent from "../agent";
import { handleError } from "../handleresponemessage";
import Result from "../core/result";
import { Pagination, PagingParams } from "../core/pagination";

export class CategoryStore {
    categories: Category[] = [];
    selectedItem: Category | undefined = undefined;
    isViewList = false;
    isWaitingServerResponse = false;

    pagingParams = new PagingParams();
    pagination: Pagination | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }
    setPagination = (pagination: Pagination | null) => {
        this.pagination = pagination;
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    addItem = (item: Category) => {
        this.categories = [...this.categories.filter(x => x.id !== item.id), item];
    }

    setIsLoadingData = (state: boolean = true) => {
        this.isWaitingServerResponse = state;
    }
    private sortArray(array: Category[]) {
        return [...array.sort((a, b) => {
            const codeA = a.name.toLowerCase();
            const codeB = b.name.toLowerCase();
            return (codeA < codeB) ? -1 : (codeA > codeB) ? 1 : 0;
        })];
    }
    setArray = (array: Category[]) => {
        this.categories = [];
        this.categories = [...array];
        this.categories = this.sortArray(this.categories);
    }
    loadData = async (pagenumber: number = -1, pagesize: number = -1) => {
        if (pagenumber !== -1 && pagesize !== -1) {
            this.setPagingParams(new PagingParams(pagenumber, pagesize));
        }
        this.setIsLoadingData(true)
        const result = await Agent.Categories.list(this.axiosParams);
        try {
            if (result.isSuccess) {
                const resultData = result.data ? result.data : [];
                resultData.forEach(x => {
                    this.addItem(x);
                });
                this.setPagination(result.pagination);
                this.setIsLoadingData(false);
            }
            this.setIsLoadingData(false);
        } catch (error) {
            console.log(error);
            this.setIsLoadingData(false);
        }
    }
    setSelectedItem = (id: string | undefined = '') => {
        this.selectedItem = id ? this.categories.find(b => b.id === id) : undefined
    }
    openForm = (id: string | undefined = '') => {
        this.setSelectedItem(id);
        this.isViewList = false;
    }
    closeForm = () => {
        this.setSelectedItem();
        this.isViewList = true;
    }
    createItem = async (item: Category) => {
        this.setIsLoadingData();
        try {
            const copyItem = {...item};
            copyItem.id = uuid4();
            const result = await Agent.Categories.create(copyItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.categories = this.sortArray([...this.categories, copyItem]);
                });
            }
            this.setIsLoadingData(false);
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }

    }
    updateItem = async (item: Category) => {
        this.setIsLoadingData();
        try {
            const copyItem = {...item};
            const result = await Agent.Categories.update(copyItem);
            if (result.isSuccess) {
                runInAction(() => {
                    this.categories = this.sortArray([...this.categories.filter(b => b.id !== copyItem.id)
                        , copyItem]);
                });
            }
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }
    }
    deleteItem = async (id: string) => {
        this.setIsLoadingData();
        try {
            const result = await Agent.Categories.delete(id);
            if (result.isSuccess) {
                runInAction(() => {
                    this.categories = this.sortArray([...this.categories.filter(b => b.id !== id)]);
                });
            }
            this.setIsLoadingData(false);
            return result;
        }
        catch (error) {
            handleError(error);
            this.setIsLoadingData(false);
            return Result.Failure(error);
        }
    }
}
