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
  try {
    const response = await fetch(`${API_URL}/api/call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Call initiation failed:", error);
    return { success: false, error: "Failed to initiate call" };
  }
};
