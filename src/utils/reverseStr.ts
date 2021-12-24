export const reverseStr = (str: string) => {
    const reverseStr = str.split("/").reverse().toString().replace(/,/g, ".");

    return reverseStr;
};
