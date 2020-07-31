interface ExerciseArgs {
  target: number,
  dailyExerciseHours: Array<number>
}

interface ExerciseAnalysis {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  rating: number,
  ratingDescription: string
}

const parseExerciseArgs = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Validate target (arg 2) to be number
  if (isNaN(Number(args[2]))) throw new Error('Target must be numeric');

  // Validate all of dailyExerciseHours to be numbers
  const dailyExerciseHoursString = args.slice(3);
  const dailyExerciseHoursNumber = dailyExerciseHoursString.map(dayHours => Number(dayHours));

  if (dailyExerciseHoursNumber.includes(NaN)) {
    throw new Error('Daily exercise hours must be numeric');
  }

  return {
    target: Number(args[2]),
    dailyExerciseHours: dailyExerciseHoursNumber
  };
};

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): ExerciseAnalysis => {
  // Form all variables needed for ExerciseAnalysis interface
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(dayHours => dayHours > 0).length;
  const trainingHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = trainingHours / dailyExerciseHours.length;
  const success = target <= average;

  const calculateRating = (average: number, target: number): Rating => {
    if (average / target >= 1.0) {
      return {
        rating: 3,
        ratingDescription: 'The daily exercise target has been met. Good wo<rk.'
      };
    } else if (average / target >= 0.5 && average / target < 1.0) {
      return {
        rating: 2,
        ratingDescription: 'The daily exercise target was not met. Not too bad but could be better.'
      };
    } else {
      return {
        rating: 1,
        ratingDescription: 'The daily exercise target was not met. There is a lot of room to improve!'
      };
    }
  };

  const {rating, ratingDescription} = calculateRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

/*
* Need to determine whether calculateExercises function is called from command line with node.js or elsewhere,
* to prevent unnecessary errors being printed to the console by parseBmiArgs function.
* https://stackoverflow.com/questions/45136831/node-js-require-main-module
*/

if (require.main === module) {
  /*
  * If-check prevents errors from being printed to the console,
  * by skipping the command line argument parser.
  */
  try {
    const {target, dailyExerciseHours} = parseExerciseArgs(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (e) {
    // Fixes eslint error about 'Unsafe member access .message on any value'
    if (e instanceof Error) {
      console.log('Error:', e.message);
    }
  }
}