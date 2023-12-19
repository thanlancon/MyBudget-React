export interface EnvelopeBalance {
    id: string
    month: number
    year: number
    balance: number
}
export class MonthlyEnvelopeBalances {
    month: number | undefined = undefined
    year: number | undefined = undefined
    envelopeBalances: EnvelopeBalance[] | undefined = undefined
    /**
     *
     */
    constructor(month: number | undefined = undefined, year: number | undefined = undefined, listBalances: EnvelopeBalance[] | undefined = undefined) {
        this.month = month;
        this.year = year;
        if (listBalances) {
            this.envelopeBalances = [...listBalances];
        }
        else {
            this.envelopeBalances = undefined;
        }
    }
}
