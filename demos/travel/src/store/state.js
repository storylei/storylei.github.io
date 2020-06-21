let defCity = '上海'
try {
    if (localStorage.city) {
        defCity = localStorage.city
    }
} catch (e) {}

export default {
    city: defCity
}
