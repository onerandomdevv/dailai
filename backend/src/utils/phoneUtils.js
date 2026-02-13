const logger = require("../utils/logger");

/**
 * Detect country code and name from phone number
 */
function detectCountry(phoneNumber) {
  // Remove + and spaces
  const cleaned = phoneNumber.replace(/[\s+]/g, "");

  // Country code mapping
  const countryMap = {
    234: { code: "NG", name: "Nigeria" },
    254: { code: "KE", name: "Kenya" },
    255: { code: "TZ", name: "Tanzania" },
    256: { code: "UG", name: "Uganda" },
    233: { code: "GH", name: "Ghana" },
    27: { code: "ZA", name: "South Africa" },
  };

  // Check for country code
  for (const [prefix, country] of Object.entries(countryMap)) {
    if (cleaned.startsWith(prefix)) {
      return country;
    }
  }

  // Default to Nigeria
  return { code: "NG", name: "Nigeria" };
}

/**
 * Detect Nigerian network provider from phone number
 */
function detectNigerianNetwork(phoneNumber) {
  // Remove + and country code, get the network prefix
  const cleaned = phoneNumber.replace(/[\s+]/g, "");

  // Extract digits after country code (234)
  let networkPrefix = "";
  if (cleaned.startsWith("234")) {
    networkPrefix = cleaned.substring(3, 6); // Get next 3 digits
  } else if (cleaned.startsWith("0")) {
    networkPrefix = cleaned.substring(1, 4); // Get digits after 0
  }

  // Nigerian network prefixes
  const networkMap = {
    MTN: ["803", "806", "813", "816", "903", "906", "810", "814"],
    Airtel: ["802", "808", "812", "901", "902", "904", "907"],
    Glo: ["805", "807", "811", "815", "905"],
    "9mobile": ["809", "817", "818", "908", "909"],
  };

  // Find matching network
  for (const [network, prefixes] of Object.entries(networkMap)) {
    if (prefixes.includes(networkPrefix)) {
      return network;
    }
  }

  return null; // Unknown network
}

/**
 * Check if usage date is today and reset if needed
 */
function shouldResetDailyUsage(lastUsageDate) {
  if (!lastUsageDate) return true;

  const today = new Date();
  const lastDate = new Date(lastUsageDate);

  // Check if dates are different days
  return (
    today.getFullYear() !== lastDate.getFullYear() ||
    today.getMonth() !== lastDate.getMonth() ||
    today.getDate() !== lastDate.getDate()
  );
}

module.exports = {
  detectCountry,
  detectNigerianNetwork,
  shouldResetDailyUsage,
};
