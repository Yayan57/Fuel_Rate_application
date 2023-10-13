// Sample data (you can replace this with actual data from a data source)
const fuelQuotes = [
    { gallonsRequested: 55, deliveryAddress: "123 road st.", deliveryDate: "December 26, 2023", suggestedPrice: "$5,403.35" },
    { gallonsRequested: 755, deliveryAddress: "3511 Howard Mountains Suite 353", deliveryDate: "April 1, 2024", suggestedPrice: "$6.23" },
    { gallonsRequested: 36, deliveryAddress: "677 Keara Club", deliveryDate: "May 10, 2024", suggestedPrice: "$1,583.35" },
    { gallonsRequested: 537, deliveryAddress: "6838 Ariane Drives Apt. 484", deliveryDate: "October 16, 2024", suggestedPrice: "$18,880.35" },
    { gallonsRequested: 664, deliveryAddress: "81237 Beahan Lakes Apt. 067", deliveryDate: "November 18, 2024", suggestedPrice: "$11,737.35" },
    // Add more data as needed
];

// Function to populate the table with data
function populateTable() {
    const table = document.getElementById("fuelQuoteTable");

    fuelQuotes.forEach(quote => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = quote.gallonsRequested;
        cell2.innerHTML = quote.deliveryAddress;
        cell3.innerHTML = quote.deliveryDate;
        cell4.innerHTML = quote.suggestedPrice;
    });
}

// Call the populateTable function to fill the table
populateTable();