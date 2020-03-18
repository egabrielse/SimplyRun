const yearRange = () => {
    let startYear = 1950
    let endYear = new Date().getFullYear() - 10
    let years = []
    for (let i = endYear; i >= startYear; i--) {
        years.push(i)
    }
    return years
}

export const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
export const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
export const years = yearRange()