const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dailai-backend.onrender.com";

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: "offline" };
  }
};

export const initiateCall = async (phoneNumber: string) => {
  console.log('[API] initiateCall called with:', phoneNumber);
  console.log('[API] API_URL:', API_URL);
  
  try {
    const url = `${API_URL}/api/call`;
    console.log('[API] Making POST request to:', url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    
    console.log('[API] Response status:', response.status);
    const data = await response.json();
    console.log('[API] Response data:', data);
    
    return data;
  } catch (error) {
    console.error("[API] Call initiation failed:", error);
    return { success: false, error: "Failed to initiate call" };
  }
};
