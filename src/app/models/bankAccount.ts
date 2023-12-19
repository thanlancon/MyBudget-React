export interface BankAccount {
    id: string
    code: string
    bankId: string
    bankAccountTypeId: string
    description: string
    clearedBalance: number
    unClearedBalance: number
    totalBalance: number
  }
