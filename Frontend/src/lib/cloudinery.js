const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;

export const uploadImageToCloudinary = async (file) => {
  console.log("=== Cloudinary Upload Debug ===");
  console.log("Cloudinary URL:", cloudinaryURL);
  console.log("File details:", {
    name: file.name,
    size: file.size,
    type: file.type
  });

  // Check if URL is defined
  if (!cloudinaryURL) {
    throw new Error("Cloudinary URL is not defined. Check your environment variables.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lfrs_preset"); 

  // Debug FormData contents
  console.log("FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    console.log("Making request to:", cloudinaryURL);
    
    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    });

    console.log("Response received:");
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    // Get the response as text first to see what we're actually getting
    const responseText = await response.text();
    console.log("Raw response text:", responseText);
    console.log("Response length:", responseText.length);

    // Check if response is empty
    if (!responseText || responseText.trim() === '') {
      throw new Error("Empty response from Cloudinary");
    }

    // Check HTTP status
    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP ${response.status}: ${responseText}`;
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error && errorData.error.message) {
          errorMessage = `Cloudinary Error: ${errorData.error.message}`;
          
          // Specific help for common errors
          if (errorData.error.message.includes("Upload preset must be whitelisted")) {
            errorMessage += "\n\nFix: Go to Cloudinary Dashboard → Settings → Upload → Upload presets → Find 'rims' preset → Change 'Signing Mode' to 'Unsigned'";
          }
        }
      } catch (e) {
        // If error response isn't JSON, use the original message
      }
      throw new Error(errorMessage);
    }

    // Try to parse JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Parsed JSON data:", data);
    } catch (jsonError) {
      console.error("JSON parsing failed:", jsonError);
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
    }

    // Check if the response has the expected structure
    if (!data.secure_url) {
      console.error("No secure_url in response:", data);
      throw new Error("Invalid response structure from Cloudinary");
    }

    console.log("Upload successful! Secure URL:", data.secure_url);
    return data.secure_url;

  } catch (error) {
    console.error("=== Cloudinary Upload Error ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    
    // Re-throw with more context
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};