import { CityPulseReport } from '../types';
import { DEMO_PRESETS } from './demoPresets';

const SYSTEM_INSTRUCTION = `You are CityPulse AI, an elite real-time urban exploration, safety command center, and chaos navigation engine.
Your mission is to analyze unstructured, messy human inputs (commuter complaints, late-night travel worries, heritage food cravings, monsoon flood alarms, transit queries) and synthesize them into high-precision, actionable urban intelligence.

You must respond STRICTLY with a valid JSON object matching this exact schema:
{
  "city": "string (name of the city or district analyzed)",
  "timestamp": "string (e.g. Current Local Analysis)",
  "summary": "string (concise, high-impact executive summary of the urban situation and navigation advice)",
  "safetyScore": number between 1 and 100,
  "safetyLevel": "Safe" | "Moderate Caution" | "Unsafe",
  "safeRoutes": [
    "string recommendations with specific street names, metro lines, or tactical navigation tips"
  ],
  "culturalAndFoodSpots": [
    {
      "name": "string (name of venue or food spot)",
      "type": "string (e.g. Heritage Monument, Irani Cafe, Street Food Stall, Rooftop Shelter)",
      "budget": "string (e.g. ₹50 - ₹150, Budget Friendly, Luxury)",
      "vibe": "string (e.g. Vibrant & Historic, Cozy & Safe, High Energy)",
      "description": "string (why it matters & specialty)",
      "bestTime": "string (ideal visiting or dining hours)"
    }
  ],
  "comparisonMatrix": {
    "recommended": [
      {
        "name": "string (route, neighborhood, or venue)",
        "reason": "string (why to choose this)",
        "score": "string or number (e.g. 9.2/10)"
      }
    ],
    "avoidOrCaution": [
      {
        "name": "string (hazard, dark underpass, or flooded junction)",
        "reason": "string (root cause of danger or delay)",
        "risk": "string (specific threat: Crime, Flooding, Gridlock, Gouging)"
      }
    ]
  },
  "smartAlerts": [
    {
      "type": "Traffic" | "Weather" | "Safety",
      "message": "string (real-time alert notice)",
      "severity": "High" | "Medium" | "Low"
    }
  ],
  "transitSteps": [
    {
      "step": 1,
      "mode": "Metro" | "Walk" | "Cab" | "Bus" | "Auto",
      "title": "string",
      "instruction": "string",
      "eta": "string"
    }
  ],
  "quickStats": {
    "chaosIndex": number between 1 and 100,
    "peakHoursWarning": "string",
    "weatherCondition": "string",
    "emergencyHelpline": "string"
  }
}

Do not include any conversational preamble or markdown code fences like \`\`\`json. Output ONLY raw parseable JSON.`;

export async function analyzeCityPulseWithGemini(
  prompt: string,
  customApiKey?: string
): Promise<CityPulseReport> {
  const apiKey = customApiKey?.trim() || (import.meta.env.VITE_GEMINI_API_KEY as string)?.trim();

  // If no API key is provided, check if user input closely matches one of our demo presets
  if (!apiKey) {
    const lower = prompt.toLowerCase();
    if (lower.includes('pune') && (lower.includes('night') || lower.includes('hinjawadi') || lower.includes('viman'))) {
      return DEMO_PRESETS[0].sampleReport;
    }
    if (lower.includes('old city') || lower.includes('wada') || lower.includes('food') || lower.includes('heritage') || lower.includes('peth')) {
      return DEMO_PRESETS[1].sampleReport;
    }
    if (lower.includes('monsoon') || lower.includes('waterlog') || lower.includes('rain') || lower.includes('flood')) {
      return DEMO_PRESETS[2].sampleReport;
    }

    // If it's a custom query but no API key is available, throw an informative error
    throw new Error(
      'MISSING_KEY: Gemini API Key is required for analyzing custom live prompts. Please enter your key in the header or use .env (or test one of the 3 instant Demo Presets!).'
    );
  }

  // Model endpoint: Gemini 1.5 Flash
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const requestPayload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Analyze this messy urban situation, route, or exploration intention:\n\n"${prompt}"`
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        {
          text: SYSTEM_INSTRUCTION
        }
      ]
    },
    generationConfig: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2500,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestPayload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.error?.message ||
      `Gemini API request failed with status ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error('Gemini returned an empty response. Please verify prompt content.');
  }

  // Clean JSON response if enclosed in markdown backticks
  let cleaned = textContent.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  try {
    const parsed: CityPulseReport = JSON.parse(cleaned);
    
    // Ensure safetyScore is clamped
    if (typeof parsed.safetyScore !== 'number') {
      parsed.safetyScore = 75;
    } else {
      parsed.safetyScore = Math.min(100, Math.max(1, parsed.safetyScore));
    }

    if (!parsed.safetyLevel) {
      parsed.safetyLevel =
        parsed.safetyScore > 70 ? 'Safe' : parsed.safetyScore > 40 ? 'Moderate Caution' : 'Unsafe';
    }

    if (!parsed.city) {
      parsed.city = 'Urban Command Zone';
    }

    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', cleaned, err);
    throw new Error(
      'Failed to parse structured JSON from Gemini. Please try refining your urban query.'
    );
  }
}
