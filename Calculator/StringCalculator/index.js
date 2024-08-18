function add(numbers) {
  // Handle the case where the input string is empty
  if (numbers === "") {
    return 0;
  }

  // Default delimiter is either a comma or a newline
  let delimiter = /,|\n/;

  // Check if there is a custom delimiter specified at the start of the string
  let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);

  // If a custom delimiter is found, update the delimiter and remove the delimiter declaration from the string
  if (customDelimiterMatch) {
    delimiter = new RegExp(customDelimiterMatch[1]); // Use the custom delimiter
    numbers = numbers.replace(/^\/\/(.+)\n/, ""); // Remove the custom delimiter part from the string
  }

  // Split the string into an array of numbers based on the delimiter
  let numberArray = numbers.split(delimiter);
  let sum = 0; // Initialize the sum
  let negatives = []; // Array to keep track of negative numbers

  // Iterate through the array of numbers
  for (let num of numberArray) {
    let number = parseInt(num); // Convert each string to an integer

    if (isNaN(number)) continue; // Skip if the value is not a number

    // Check if the number is negative
    if (number < 0) {
      negatives.push(number); // Add negative number to the negatives array
    }

    sum += number; // Add the number to the sum
  }

  // If there are any negative numbers, throw an exception with the list of them
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  // Return the total sum of the numbers
  return sum;
}

// Example usage and test cases:
console.log(add("")); // Output: 0 (empty string should return 0)
console.log(add("1")); // Output: 1 (single number should return the number itself)
console.log(add("1,5")); // Output: 6 (sum of 1 and 5)
console.log(add("1\n2,3")); // Output: 6 (supports newline as a delimiter)
console.log(add("//;\n1;2")); // Output: 3 (supports custom delimiter ';')

try {
  console.log(add("1,-2,3,-4")); // Should throw an error: "Negative numbers not allowed: -2, -4"
} catch (e) {
  console.error(e.message); // Catch and log the error message
}
