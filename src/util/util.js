export function captialize(s) {
    if (typeof s !== 'string') return '';
    var strings = s.split(' ');
    var newString = '';
    for (s of strings) {
        if (s.length > 2)
            newString += (s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()) + " ";
        else
            newString += (s.toLowerCase()) + " ";
    }

    return newString.trim();
}

export function time24To12(time) {
    if (!time) return time;
    time = (time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]);

    if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? ' AM' : ' PM';
        time[0] = +time[0] % 12 || 12;
        time[0] = time[0].toString();
        if (time[0].length < 2) time[0] = "0" + time[0];
    }
    return time.join('');
}

export const getDateTime = dateString => {
    let date =
        dateString.getFullYear() +
        "/" +
        (dateString.getMonth() + 1) +
        "/" +
        dateString.getDate();
    let time = dateString.getHours() + ":" + dateString.getMinutes();

    return { date, time };
};


export function getTimeinMinutes(time24) {
    let [hrs, mins, sec] = time24.split(":");
    mins = mins + hrs * 60;
    return mins;
}

export function getDateTimeDiff(a, b) {
    return (
        (new Date(b.date) -
            new Date(a.date)) * 10000 +
        getTimeinMinutes(b.time) -
        getTimeinMinutes(a.time)
    );
}