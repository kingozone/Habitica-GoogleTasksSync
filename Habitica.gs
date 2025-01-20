function fetchHabiticaTags() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const userID = scriptProperties.getProperty("habitica_userid");
    const apiKey = scriptProperties.getProperty("habitica_apikey");
    const apiUrl = "https://habitica.com/api/v3/tags"; 

    if (!userID || !apiKey) {
        console.error("Habitica credentials are missing.");
        return [];
    }

    const options = {
        method: "get",
        headers: {
            "x-api-user": userID,
            "x-api-key": apiKey
        }
    };

    try {
        const response = UrlFetchApp.fetch(apiUrl, options);
        const json = JSON.parse(response.getContentText());
        if (json.success) {
            console.log("Fetched tags:", json.data);
            return Array.isArray(json.data) ? json.data : []; // Ensure it's an array
        } else {
            console.error("Error fetching Habitica tags:", json);
            return [];  // Return an empty array on error
        }
    } catch (error) {
        console.error("Error occurred while fetching Habitica tags:", error.message);
        return [];  // Return an empty array on exception
    }
}
