import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/barcode/lookup', async (req, res) => {
  try {
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({ error: 'Barcode is required' });
    }

    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    if (response.data.status === 1) {
      const product = response.data.product;
      const nutritionData = {
        name: product.product_name || 'Unknown Product',
        barcode: barcode,
        brand: product.brands || 'Unknown Brand',
        nutrition: {
          calories: product.nutriments?.['energy-kcal'] || 'N/A',
          protein: product.nutriments?.proteins || 'N/A',
          carbs: product.nutriments?.carbohydrates || 'N/A',
          fat: product.nutriments?.fat || 'N/A',
          fiber: product.nutriments?.fiber || 'N/A',
          sodium: product.nutriments?.sodium || 'N/A'
        },
        ingredients: product.ingredients_text || 'Not available',
        allergens: product.allergens || 'Not listed',
        imageUrl: product.image_url || null,
        nutriscore: product.nutriscore_grade || 'Not rated',
        healthScore: calculateHealthScore(product)
      };

      return res.json({ success: true, data: nutritionData });
    } else {
      return res.status(404).json({
        success: false,
        error: 'Product not found in database'
      });
    }
  } catch (error) {
    console.error('Barcode lookup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to lookup barcode'
    });
  }
});

app.post('/api/mealplan/generate', async (req, res) => {
  try {
    const {
      dietary_preferences,
      health_goals,
      cuisine = 'Indian',
      days = 7,
      calories = 2000
    } = req.body;

    if (!dietary_preferences || !health_goals) {
      return res.status(400).json({
        error: 'dietary_preferences and health_goals are required'
      });
    }

    const prompt = `
Generate a ${days}-day meal plan.

Requirements:
- Cuisine: ${cuisine}
- Use foods commonly available in India
- Meals should follow Indian eating habits
- Include breakfast, lunch, dinner and snacks
- Avoid western foods like burgers, pizza, pasta, tacos, sandwiches
- Dietary Preference: ${dietary_preferences}
- Health Goal: ${health_goals}
- Daily Calories: ${calories}

Examples:

Breakfast:
Poha, Upma, Idli, Dosa, Besan Chilla, Moong Dal Chilla

Lunch:
Dal Roti, Rajma Chawal, Chole Chawal, Khichdi, Paneer Sabzi

Dinner:
Dal Tadka, Paneer Bhurji, Vegetable Curry, Roti, Brown Rice

Snacks:
Roasted Chana, Makhana, Fruit Chaat, Sprouts Chaat

Return ONLY valid JSON:

{
  "mealPlan": [
    {
      "day": 1,
      "meals": {
        "breakfast": "",
        "lunch": "",
        "dinner": "",
        "snacks": ""
      }
    }
  ],
  "nutritionTips": [],
  "shoppingList": []
}
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let mealPlanData;

    try {
      const cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      mealPlanData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Gemini Response:', text);

      mealPlanData = {
        mealPlan: [],
        nutritionTips: [],
        shoppingList: []
      };
    }

    res.json({
      success: true,
      data: mealPlanData,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Meal Plan Error:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/ingredients/analyze', async (req, res) => {
  try {
    const { ingredients, allergies = [] } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients array required' });
    }

    const prompt = `Analyze these ingredients: ${ingredients.join(', ')}
${allergies.length > 0 ? `User allergies: ${allergies.join(', ')}` : ''}

Return JSON: {healthRating: 1-10, summary: "...", allergens: [], alternatives: [{current, replacement}], warnings: []}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Parse failed' };

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze'
    });
  }
});

function calculateHealthScore(product) {
  let score = 100;
  const cal = product.nutriments?.['energy-kcal'];
  if (cal && cal > 300) score -= 10;
  const sugar = product.nutriments?.sugars;
  if (sugar && sugar > 10) score -= 15;
  const sodium = product.nutriments?.sodium;
  if (sodium && sodium > 600) score -= 10;
  const satFat = product.nutriments?.['saturated-fat'];
  if (satFat && satFat > 5) score -= 10;
  const fiber = product.nutriments?.fiber;
  if (fiber && fiber > 3) score += 5;
  const protein = product.nutriments?.proteins;
  if (protein && protein > 5) score += 5;
  return Math.max(0, Math.min(100, score));
}

app.listen(PORT, () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
});