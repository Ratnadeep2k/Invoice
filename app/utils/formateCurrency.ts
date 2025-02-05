interface iAppProps{
    amount: number
    currency: "USD" | 'IND'
}


export function formateCurrency ({amount,currency}:iAppProps) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount)
}