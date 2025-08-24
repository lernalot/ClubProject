const cal = (x, n) => {
    // 
    if (n === 0) return 1;
    let res = 1;
    for (let i = 0; i < n; i++) {
        res *= x
    }
    if (res > Number.MAX_VALUE) {
        return Number.MAX_VALUE
    }
    if (res < Number.MIN_VALUE) {
        return Number.MIN_VALUE
    }
    return res
}

console.log(cal(x, 8))

// sign = x*x
// i < 8/2
// res *= sign

// let res1 = 1
// const cal1 = (res, n) => {
//     if (n <= 1) return
//     res1 *= res
//     res1 = cal(res1, n/2)
// }