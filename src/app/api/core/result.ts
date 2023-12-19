export default class Result<T> {
    isSuccess: boolean;
    data?: T;
    error?: any;
    /**
     *
     */
    constructor(isSuccess = true, error = '', data: T | undefined = undefined) {
        this.isSuccess = isSuccess;
        this.error = error;
        this.data = data;
    }
    public static Success<T>(data: T | undefined = undefined): Result<T> {
        return new Result<T>(true, '', data);
    }
    public static Failure<T>(error: any, data: T | undefined = undefined): Result<T> {
        return new Result<T>(false, error, data);
    }
}
// export default class Result {
//     isSuccess: boolean;
//     value?: any;
//     error?: any;
//     /**
//      *
//      */
//     constructor(isSuccess = true, error = '', value?: any) {
//         this.isSuccess = isSuccess;
//         this.error = error;
//         this.value = value;
//     }
//     public static Success(value: any = undefined): Result {
//         return new Result(true, '', value);
//     }
//     public static Failure(error:any, value: any = undefined): Result {
//         return new Result(false, error, value);
//     }
// }
