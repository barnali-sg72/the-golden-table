export function getTime(time) {
    if (time === "" || time === null || time === undefined) {
        return "";
    }
    let arr = time.split(":");
    let hour = arr[0];
    let min = arr[1];
    let time2 = "";
    if (hour > 12) {
        time2 =  (hour - 12) + ":" + min + " PM";
    } else {
        time2 =  time + " AM";
    }
    return time2;
}