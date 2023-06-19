export function getColor(rate) {
    if (rate >= 7) {
        return "green";
    } else if (rate >= 5) {
        return "orange";
    } else {
        return "red";
    }
}