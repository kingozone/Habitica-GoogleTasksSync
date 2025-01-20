function getTodosFromHabitica() {
  // Access Habitica API credentials from script properties
  const scriptProperties = PropertiesService.getScriptProperties();
  const userID = scriptProperties.getProperty("habitica_userid");
  const apiKey = scriptProperties.getProperty("habitica_apikey");
  const apiUrl = scriptProperties.getProperty("habitica_apiurl") + "tasks/user?type=todos";

  if (!userID || !apiKey) {
    throw new Error("Habitica credentials (user ID and API key) are missing or misconfigured in script properties.");
  }

  // Set up request headers for Habitica API
  const headers = {
    "x-api-user": userID,
    "x-api-key": apiKey
  };

  const options = {
    method: "get",
    headers: headers
  };

  try {
    // Fetch the todos from Habitica
    const response = UrlFetchApp.fetch(apiUrl, options);
    const json = JSON.parse(response.getContentText());

    if (json.success) {
      console.log("Fetched Habitica todos successfully.");
      return json.data; // Habitica todos are in the `data` property
    } else {
      console.error("Error fetching Habitica todos:", json);
      throw new Error("Failed to fetch Habitica todos. Check API settings.");
    }
  } catch (error) {
    console.error("Error in getTodosFromHabitica:", error.message);
    throw error;
  }
}
