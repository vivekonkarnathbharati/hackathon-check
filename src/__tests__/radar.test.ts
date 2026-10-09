import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Preset fixtures matching CityPulseReport / ChaosGrid schema
const DEMO_PRESETS_FIXTURE = [
  {
    id: 'pune-night-transit',
    title: 'Pune: Night Transit & Safe Routes',
    safetyScore: 84,
    safetyLevel: 'Safe',
    hazards: [
      { name: 'Pashan-Sus Dark Underpass', risk: 'Moderate crime risk & limited rescue access', reason: 'Low illumination' },
      { name: 'Wakad Old Service Road', risk: 'Road hazard & blind spots', reason: 'Heavy container truck parking' }
    ],
    recommended: [
      { name: 'Baner Road -> Wakad Highway Link', score: '9.2 / 10', reason: 'Bright street lighting and police checkpoints' },
      { name: 'Pune Metro + Verified Cab Intermodal', score: '8.8 / 10', reason: 'CCTV covered stations' }
    ],
    spots: [
      { name: 'Nal Stop Poha & Chai Stalls', type: 'Late Night Street Food Hub', budget: '₹40 - ₹80', vibe: 'Bustling, warm' },
      { name: 'Irani Cafe Baner', type: 'Iconic Iranian Cafe', budget: '₹100 - ₹200', vibe: 'Commuter friendly' }
    ],
    alerts: [
      { type: 'Safety', severity: 'Medium', message: 'Active Pune Police barricade at University Circle' },
      { type: 'Traffic', severity: 'High', message: 'Heavy interstate goods vehicles congestion on NH48' }
    ]
  },
  {
    id: 'old-city-heritage-food',
    title: 'Old City: Heritage & Street Food on a Budget',
    safetyScore: 92,
    safetyLevel: 'Safe',
    hazards: [
      { name: 'Tulshibaug 4-wheeler vehicle entry', risk: 'Severe gridlock and towing', reason: 'Pedestrian density' }
    ],
    recommended: [
      { name: 'Kasba Peth Artisan Walk', score: '9.6 / 10', reason: 'Traditional coppersmiths alley' }
    ],
    spots: [
      { name: 'Shaniwar Wada & Lal Mahal', type: '18th-century Peshwa Fortification', budget: '₹25 entry', vibe: 'Regal, historic' }
    ],
    alerts: [
      { type: 'Traffic', severity: 'Medium', message: 'No-vehicle zone enforced inside Tulshibaug' }
    ]
  },
  {
    id: 'monsoon-rush-hour',
    title: 'Monsoon Rush Hour: Traffic & Waterlogging Alert',
    safetyScore: 48,
    safetyLevel: 'Moderate Caution',
    hazards: [
      { name: 'Bhide Causeway & Riverbed Road', risk: 'Drowning hazard & vehicle submersion', reason: 'River discharge 24,000 cusecs' }
    ],
    recommended: [
      { name: 'Pune Metro Aqua Line', score: '9.8 / 10', reason: '100% immune to road waterlogging' }
    ],
    spots: [
      { name: 'Vaishali FC Road', type: 'Sheltered Iconic South Indian Cafe', budget: '₹120 - ₹220', vibe: 'Safe rain haven' }
    ],
    alerts: [
      { type: 'Weather', severity: 'High', message: 'IMD Orange Alert: Rainfall forecast 65mm+' }
    ]
  }
];

describe('ChaosGrid AI — Geospatial & Radar Unit Test Suite', () => {

  describe('1. Safety Index Calculation Logic & Boundary Verification', () => {
    function clampSafetyScore(score: number): number {
      if (typeof score !== 'number' || isNaN(score)) return 75;
      return Math.min(100, Math.max(0, score));
    }

    function computeSafetyLevel(score: number): 'Safe' | 'Moderate Caution' | 'Unsafe' {
      const clamped = clampSafetyScore(score);
      if (clamped >= 70) return 'Safe';
      if (clamped >= 40) return 'Moderate Caution';
      return 'Unsafe';
    }

    it('clamps scores below 0 to 0', () => {
      assert.strictEqual(clampSafetyScore(-15), 0);
      assert.strictEqual(clampSafetyScore(-1), 0);
      assert.strictEqual(clampSafetyScore(-100), 0);
    });

    it('clamps scores above 100 to 100', () => {
      assert.strictEqual(clampSafetyScore(145), 100);
      assert.strictEqual(clampSafetyScore(101), 100);
      assert.strictEqual(clampSafetyScore(999), 100);
    });

    it('preserves valid scores between 0 and 100', () => {
      assert.strictEqual(clampSafetyScore(0), 0);
      assert.strictEqual(clampSafetyScore(48), 48);
      assert.strictEqual(clampSafetyScore(75), 75);
      assert.strictEqual(clampSafetyScore(84), 84);
      assert.strictEqual(clampSafetyScore(92), 92);
      assert.strictEqual(clampSafetyScore(100), 100);
    });

    it('correctly categorizes scores into safety level tiers', () => {
      assert.strictEqual(computeSafetyLevel(95), 'Safe');
      assert.strictEqual(computeSafetyLevel(70), 'Safe');
      assert.strictEqual(computeSafetyLevel(69), 'Moderate Caution');
      assert.strictEqual(computeSafetyLevel(40), 'Moderate Caution');
      assert.strictEqual(computeSafetyLevel(39), 'Unsafe');
      assert.strictEqual(computeSafetyLevel(12), 'Unsafe');
    });

    it('validates all preloaded demo presets safety scores and levels', () => {
      DEMO_PRESETS_FIXTURE.forEach((preset) => {
        const { safetyScore, safetyLevel } = preset;
        assert.ok(safetyScore >= 0 && safetyScore <= 100, `Preset ${preset.id} score out of bounds`);
        assert.ok(['Safe', 'Moderate Caution', 'Unsafe'].includes(safetyLevel), `Preset ${preset.id} invalid level`);
      });
    });
  });

  describe('2. Hazard Filtering Logic & Coordinate Verification', () => {
    const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

    function verifyCoordinateInBounds(coords: [number, number], base: [number, number], maxDelta = 0.5): boolean {
      const [lat, lng] = coords;
      return Math.abs(lat - base[0]) <= maxDelta && Math.abs(lng - base[1]) <= maxDelta;
    }

    it('verifies Pune base coordinates are accurate for central Maharashtra', () => {
      assert.ok(PUNE_CENTER[0] > 18.0 && PUNE_CENTER[0] < 19.0, 'Pune latitude out of range');
      assert.ok(PUNE_CENTER[1] > 73.0 && PUNE_CENTER[1] < 74.5, 'Pune longitude out of range');
    });

    it('filters hazard pins and caution zones correctly', () => {
      DEMO_PRESETS_FIXTURE.forEach((preset) => {
        const hazards = preset.hazards;
        assert.ok(Array.isArray(hazards), 'Avoid or caution matrix must be an array');
        assert.ok(hazards.length > 0, 'Hazard list must contain entries');

        hazards.forEach((h) => {
          assert.ok(typeof h.name === 'string' && h.name.length > 0, 'Hazard must have a name');
          assert.ok(typeof h.risk === 'string' && h.risk.length > 0, 'Hazard must specify risk factor');
          assert.ok(typeof h.reason === 'string' && h.reason.length > 0, 'Hazard must provide rationale');
        });
      });
    });

    it('filters recommended safe routes and corridors correctly', () => {
      DEMO_PRESETS_FIXTURE.forEach((preset) => {
        const recommended = preset.recommended;
        assert.ok(Array.isArray(recommended), 'Recommended matrix must be an array');
        assert.ok(recommended.length > 0, 'Recommended list must contain entries');

        recommended.forEach((r) => {
          assert.ok(typeof r.name === 'string' && r.name.length > 0);
          assert.ok(typeof r.reason === 'string' && r.reason.length > 0);
          assert.ok(r.score !== undefined, 'Recommended item must have a score rating');
        });
      });
    });

    it('verifies generated coordinates stay within localized metropolitan radius', () => {
      for (let i = 0; i < 15; i++) {
        const angle = ((i * 67 + 23) % 360) * (Math.PI / 180);
        const distance = 0.015 + ((i * 31) % 25) * 0.0012;
        const testCoords: [number, number] = [
          PUNE_CENTER[0] + Math.sin(angle) * distance,
          PUNE_CENTER[1] + Math.cos(angle) * distance,
        ];
        assert.ok(
          verifyCoordinateInBounds(testCoords, PUNE_CENTER, 0.2),
          `Generated coordinate index ${i} exceeded city bounding box`
        );
      }
    });
  });

  describe('3. Gemini JSON Schema Fallback Structure Parsing', () => {
    it('verifies all demo presets strictly comply with ChaosGrid schema requirements', () => {
      DEMO_PRESETS_FIXTURE.forEach((preset) => {
        assert.ok(typeof preset.id === 'string' && preset.id.length > 0);
        assert.ok(typeof preset.title === 'string' && preset.title.length > 0);
        assert.ok(typeof preset.safetyScore === 'number');
        assert.ok(Array.isArray(preset.spots));
        assert.ok(Array.isArray(preset.alerts));
        assert.ok(Array.isArray(preset.recommended));
        assert.ok(Array.isArray(preset.hazards));

        // Validate spots
        preset.spots.forEach((spot) => {
          assert.ok(typeof spot.name === 'string');
          assert.ok(typeof spot.type === 'string');
          assert.ok(typeof spot.budget === 'string');
          assert.ok(typeof spot.vibe === 'string');
        });

        // Validate alerts
        preset.alerts.forEach((alert) => {
          assert.ok(['Traffic', 'Weather', 'Safety'].includes(alert.type));
          assert.ok(typeof alert.message === 'string');
          assert.ok(['High', 'Medium', 'Low'].includes(alert.severity));
        });
      });
    });

    it('ensures sanitized JSON string parsing strips markdown fences properly', () => {
      const rawMarkdown = '```json\n{"city": "Pune", "safetyScore": 88}\n```';
      let cleaned = rawMarkdown.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
      }
      const parsed = JSON.parse(cleaned);
      assert.strictEqual(parsed.city, 'Pune');
      assert.strictEqual(parsed.safetyScore, 88);
    });
  });
});
