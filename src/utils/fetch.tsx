export async function fetchAPI(url:string) {
    try {
      // Merge default and user options
      const mergedOptions = {
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Build request URL
      const requestUrl = url;
  
  
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error(error);
      throw new Error(`Please check if your server is running and you set all the required tokens.`);
    }
  }