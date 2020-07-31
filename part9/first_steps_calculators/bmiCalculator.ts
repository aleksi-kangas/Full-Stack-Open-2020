interface BmiArgs {
  height: number,
  weight: number
}

const parseBmiArgs = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // Validate arguments 2 and 3 to be numbers
  // From the material
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided arguments were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string | undefined => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severely underweight';
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (bmi >= 40) {
    return 'Obese Class III (Very severely obese)';
  } else {
    return;
  }
};

/*
* Need to determine whether calculateBmi function is called from command line with node.js or elsewhere,
* to prevent unnecessary errors being printed to the console by parseBmiArgs function.
* https://stackoverflow.com/questions/45136831/node-js-require-main-module
*/

if (require.main === module) {
  /*
  * If-check prevents errors from being printed to the console,
  * by skipping the command line argument parser.
  */
  try {
    const {height, weight} = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    // Fixes eslint error about 'Unsafe member access .message on any value'
    if (e instanceof Error) {
      console.log('Error:', e.message);
    }
  }
}