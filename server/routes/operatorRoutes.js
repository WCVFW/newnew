import express from "express";
import fetch from "node-fetch"; // Ensure 'npm install node-fetch' is run if using Node < 18

const router = express.Router();

// --- API Credentials for Recharge Plans ---
const API_CUSTOMER_ID = process.env.API_CUSTOMER_ID || '3176029605'; // For allbills.in
const API_TOKEN = process.env.API_TOKEN || '6FGuGViLkD0f4Y2UppBonx00l'; // For allbills.in

// --- Helper: Safe Fetch ---
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("External API fetch failed:", response.status, response.statusText);
      return null;
    }
    // Check if content type is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      // Handle cases where API returns plain text errors
      return null;
    }
  } catch (err) {
    console.error("External API fetch error:", err);
    return null;
  }
}

// GET /api/plans/:operatorCode/:circleCode - Fetch Mobile Plans
router.get("/plans/:operatorCode/:circleCode", async (req, res) => {
  const { operatorCode, circleCode } = req.params;

  // Corrected URL for Mobile Prepaid Plans
  const plansApiUrl = `https://api.allbills.in/operatorapi/prepaid?customer_id=${API_CUSTOMER_ID}&token=${API_TOKEN}&circle=${circleCode}&operator=${operatorCode}`;
  
  console.log(`[Backend] Fetching Mobile plans from: ${plansApiUrl}`);

  const data = await safeFetch(plansApiUrl);

  if (!data) {
    console.error("[Backend] Mobile Plan Fetch returned null.");
    // Return 200 with error message so frontend handles it gracefully
    return res.json({ error: 'Service unavailable for this operator.' });
  }

  if (typeof data === 'object' && !data.error) {
    res.json(data);
  } else {
    res.json({ error: data.message || 'No plans found' });
  }
});

// GET /api/dth-plans/:operatorId - Fetch DTH Plans
router.get("/dth-plans/:operatorId", async (req, res) => {
  const { operatorId } = req.params;

  // Corrected URL for DTH Plans
  const dthPlansApiUrl = `https://api.allbills.in/operatorapi/dthplan?customer_id=${API_CUSTOMER_ID}&token=${API_TOKEN}&operator=${operatorId}`;
  
  console.log(`[Backend] Fetching DTH plans from: ${dthPlansApiUrl}`);

  const data = await safeFetch(dthPlansApiUrl);

  if (!data) {
    console.error("[Backend] DTH API returned null/failed");
    return res.json({ error: 'DTH plan service is currently unavailable.' });
  }

  if (typeof data === 'object' && !data.error) {
    res.json(data);
  } else {
    res.json({ error: data.message || 'No DTH plans found for this operator.' });
  }
});

// GET /api/operator/:mobileNumber - Fetch Operator
// FIXED: This prevents the 502 Error by returning a fallback response
router.get("/operator/:mobileNumber", async (req, res) => {
  const { mobileNumber } = req.params;

  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: "Invalid 10-digit mobile number." });
  }

  // NOTE: The 'operatorapi/check' endpoint was causing 502 errors.
  // We return a response indicating auto-detection is off, 
  // forcing the Frontend to allow manual selection without crashing.
  
  console.log(`[Backend] Skipping auto-detect for: ${mobileNumber}`);
  
  res.json({
    found: false,
    message: "Auto-detection unavailable, please select operator manually."
  });
});

export default router;
