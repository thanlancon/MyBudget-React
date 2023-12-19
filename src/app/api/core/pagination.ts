import Result from "./result";

export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> extends Result<T>{
    pagination: Pagination | null;

    constructor(data: T | undefined = undefined, pagination: Pagination | null, success: boolean, error: any | null) {
        super(success, error, data);
        this.pagination = pagination;
    }
    public static SuccessWithPagination<T>(data: T | undefined = undefined, pagination: Pagination) {
        return new PaginatedResult<T>(data, pagination, true, null);
    }
    public static Failure<T>(error: any, data: T | undefined = undefined) {
        return new PaginatedResult<T>(data, null, false, error);
    }
}
// export class PaginatedResult<T> {
//     isSuccess: boolean = false;
//     error: any | null;
//     data: T | null;
//     pagination: Pagination | null;

//     constructor(data: T | null, pagination: Pagination | null, success: boolean, error: any | null) {
//         this.data = data;
//         this.pagination = pagination;
//         this.isSuccess = success;
//         this.error = error;
//     }
//     public static Success<U>(data: U, pagination: Pagination) {
//         return new PaginatedResult<U>(data, pagination, true, null);
//     }
//     public static Failure<U>(error: any) {
//         return new PaginatedResult<U>(null, null, false, error);
//     }
// }

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 20) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
