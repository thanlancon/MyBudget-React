export default interface Transaction {
    id: string
    /// <summary>
    /// Transaction ID of a transaction where the fund came from
    /// 0 : fund was not transfer from any other transaction
    /// </summary>
    transactionTransferID: string
    transactionDate: Date | null
    postDate: Date | null
    bankId: string
    bankId_Transfer: string
    payeeId: string
    envelopeId: string
    inflow: number
    outflow: number
    isCleared: boolean
    totalBalance: number
    sequenceNumber:number
    note: string
}
