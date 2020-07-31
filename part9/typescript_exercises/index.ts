import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  // Extract query parameters
  const height = req.query.height;
  const weight = req.query.weight;
  // Missing parameters
  if (!height) {
    return res.status(400).json({ error: 'Height (cm) parameter missing'});
  } else if (!weight) {
    return res.status(400).json({ error: 'Weight (kg) parameter missing'});
  }
  // Parameters are numeric
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({
      weight,
      height,
      bmi
    })
  } else {
    // Non-numeric parameters
    return res.status(400).json({ error: 'Parameters are not numbers'});
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

