
import moment from "moment";

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(Number(num))) return "";
  
  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split('.'); // Split into integer and fractional parts
  
  let integerPart = parts[0];
  let fractionalPart = parts[1];
  
  // Regex for Indian numbering system
  // It handles the first three digits, then every two digits
  const lastThree  = integerPart.substring(integerPart.length - 3);
  const otherNumbers  = integerPart.substring(0, integerPart.length - 3);
  
  if (otherNumbers !== '') {
    // Apply comma after every two digits for the 'otherNumbers' part
    const formattedOtherNumbers  = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    integerPart = formattedOtherNumbers + ',' + lastThree;
  } else {
    integerPart = lastThree; // No change if less than 4 digits
  }
  
  // Combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export const prepareLineChartData = (transactions) => {
    const groupedData = {};

    transactions.forEach((transaction) => {
        const date = transaction.date;

        // create date group
        if (!groupedData[date]) {
            groupedData[date] = {
                date,
                totalAmount: 0,
                items: [],
                month: moment(date).format("Do MMM")
            };
        }

        // add amount
        groupedData[date].totalAmount += Number(transaction.amount);

        // store transaction in items array
        groupedData[date].items.push({
            ...transaction
        });
    });

    return Object.values(groupedData).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};