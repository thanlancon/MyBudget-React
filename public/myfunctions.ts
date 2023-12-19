import { parseISO } from 'date-fns';

export const convertToDate = (date: Date | null) => {
    if (date === null) {
        return null;
    }
    const parsedDate = parseISO(date.toString());
    return parsedDate;
}

export const dateToString = (date: Date | null) => {
    if (date === null) {
        return '';
    }
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return formattedDate;
}

export const formatCurrencyNumber = (num?: number | undefined) => {
    if (num === null || num === undefined) {
        return 0;
    }
    else {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    }
}
