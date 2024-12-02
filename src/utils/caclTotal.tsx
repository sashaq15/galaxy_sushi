

export function caclTotalItems(arr: any) {
    let totalItems = 0;
    for(let i = 0; i < arr.length;i++) {
        totalItems += 1*arr[i].count
    }
    return totalItems;
}

export function caclTotalPrice(arr: any) {
    let totalPrice = 0;
    for(let i = 0; i < arr.length;i++) {
        totalPrice += arr[i].price*arr[i].count
    
    }

    return totalPrice.toFixed(1);
}