import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
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
    });
  } else {
    // Non-numeric parameters
    return res.status(400).json({ error: 'Parameters are not numbers'});
  }
});

app.post('/exercises', (req, res) => {
  // Fixing unsafe assignment issue
  // Source: https://www.reddit.com/r/typescript/comments/hk1mp8/how_do_i_destructure_express_requestbody_without/
  interface Body {
    target: number,
    daily_exercises: Array<number>
  }
  const {target, daily_exercises}: Body = req.body as Body;
  if (!target || !daily_exercises) {
    return res.status(400).json({ error: 'parameters missing'});
  }
  const daily_exercises_numeric = daily_exercises.map(dayHours => Number(dayHours));
  if (!Array.isArray(daily_exercises) || daily_exercises_numeric.includes(NaN) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters'});
  }
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

