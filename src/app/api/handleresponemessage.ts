import Result from "./core/result";

export default function handleServerResponse(response: Result<any>) {
    if (response.isSuccess) {
        alert('Successfull!!!')
    }
    else {
        handleError(response.error);
    }
}

export function handleError(error: any) {
    let messages: string[] = [];

    if (error !== null && typeof error === 'object') {
        console.log(error['errors']);
        if (error['errors']) {
            const errorObject=error['errors'];
            Object.keys(errorObject).forEach(key => {
                const value = errorObject[key];

                if (typeof value === 'string') {
                    // Direct string message
                    messages = messages.concat(value);
                } else if (Array.isArray(value)) {
                    // Array of messages
                    messages = messages.concat(value);
                } else if (value !== null && typeof value === 'object') {
                    // Nested object, recursive approach might be needed
                    // This step can be complex based on how deep the nesting goes
                }
            });
            alert(messages.join('\n'));
        }
    } else {
        alert(error);
    }

}
