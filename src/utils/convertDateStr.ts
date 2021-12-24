export const convertDateStr = (str: string) => {
    const dateArray = str.split("/");
    const year = dateArray[2].toString();

    dateArray.pop();
    dateArray.unshift(year);
    const convertDate = dateArray.toString().replace(/,/g, ".");

    return convertDate;
};
