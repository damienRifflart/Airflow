export const getDateFromUnix = (unix: number): [string, string] => {
    const date = new Date(unix * 1000);
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
    const optionsHour: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
    const dateStr = `${date.toLocaleString('en-US', optionsDate)}`;
    const hourString = `${date.toLocaleString('en-US', optionsHour)} UTC`;
    return [dateStr, hourString];
}

export const getDate = (date: Date): [string, string] => {
    const month = date.toLocaleString("en-US", {month: "short", timeZone: "UTC"});
    const dateStr = `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    const hourString = `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")} UTC`;
    return [dateStr, hourString];
};