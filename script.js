document.addEventListener('DOMContentLoaded', function () {
    // Get all the region items
    const regionItems = document.querySelectorAll('.region-item');

    // Add click event listeners to each item
    regionItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedRegion = item.getAttribute('data-region');
            changeText(selectedRegion);
            changeRegion(selectedRegion);
        });
    });
});

function changeText(selectedOption) {
    document.getElementById('dropdownMenuButton').innerText = selectedOption;
}

async function changeRegion(region) {
    document.getElementById('dropdownMenuButton').innerText = region;
    if (region === 'India') {
        await fetchDataIndia();
    } else {
        await fetchData(region);
    }
}

async function fetchDataIndia() {
    const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    const record = await res.json();

    const summary = record.data.summary; // Get summary object
    const lastUpdated = record.lastRefreshed.split('T')[0];

    // Set values to the HTML elements
    document.getElementById("date").innerHTML = lastUpdated; // Use the last refreshed date
    document.getElementById("confirmedCases").innerHTML = summary.confirmedCasesIndian;
    document.getElementById("deaths").innerHTML = summary.deaths;
}

async function fetchData(state) {
    const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    const record = await res.json();

    const regional = record.data.regional; // Get regional array
    const stateData = regional.find(region => region.loc === state); // Find the data for the selected state

    if (stateData) {
        const lastUpdated = record.lastRefreshed.split('T')[0];

        // Set values to the HTML elements
        document.getElementById("date").innerHTML = lastUpdated; // Use the last refreshed date
        document.getElementById("confirmedCases").innerHTML = stateData.totalConfirmed;
        document.getElementById("deaths").innerHTML = stateData.deaths;
    } else {
        // Handle case where region data is not found
        document.getElementById("date").innerHTML = "N/A";
        document.getElementById("confirmedCases").innerHTML = "N/A";
        document.getElementById("deaths").innerHTML = "N/A";
    }
}
