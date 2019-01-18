(function() {
    "use strict";

    /*==========================*\
        #Multi Button
    \*==========================*/

    // TODO: Create "Add All" Button
    // TODO: the damn icon for the button doesn't show up
    // TODO: get this string from an input
    let testSearch = `Square Ash Shield 
    Bronze File 
    Steel Celata 
    Toothed Ramhorn Staff 
    Hard Leather Boots 
    Cotton Dress Gloves 
    Potion Of Intelligence 
    Parsnip Salad`;

    // Important Elements
    let searchTable = document.querySelector("table#recipe-book");
    let inputRow = searchTable.querySelectorAll("thead tr")[1].querySelector("th.valign");
    let searchTableBody = searchTable.querySelector("tbody");

    // Create & Append Multi Search Button
    let multiBtn = document.createElement("button");
    multiBtn.className = "sg-multi-button btn btn-default margin-left";
    multiBtn.title = "Search For Multiple Items";
    multiBtn.innerHTML = `<i class="glyphicon glyphicon-duplicate"></i>`;
    multiBtn.addEventListener("click", async () => {
        // Search for all items by name
        let searchResults = await searchMultiple(testSearch);

        // Append results to the table
        searchResults.forEach(result => {
            searchTableBody.innerHTML += result.tbody;
        });
    });
    inputRow.appendChild(multiBtn);
})();

/*--------------------------*\
    #Helper Fucntions
\*--------------------------*/

function searchMultiple(searchString) {
    let itemList = searchString
        // Convert item name into a searchable string♠
        .split("\n")
        .map(item =>
            item
                .trim()
                .toLowerCase()
                .replace(/\s/g, "+")
        )
        // Remove empty values
        .filter(itemSearchName => itemSearchName)
        // Map to their API calls
        .map(itemSearchName =>
            fetch(
                `https://ffxivcrafting.com/recipes/search?name=${itemSearchName}&min=1&max=999&class=all&per_page=50&sorting=name.asc`
            )
        );

    // Wait for api response
    return (
        Promise.all(itemList)
            // send response as .json()
            .then(responseList => Promise.all(responseList.map(res => res.json())))
    );
}
