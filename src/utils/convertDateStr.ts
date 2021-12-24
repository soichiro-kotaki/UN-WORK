export const convertDateStr = (str: string) => {
    const dateArray = str.split("/");

    dateArray.unshift(dateArray[2], dateArray[1]);
    const reverseDate = dateArray.splice(2).reverse().toString().replace(/,/g, ".");

    return reverseDate;
};
