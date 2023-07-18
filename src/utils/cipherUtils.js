/**
 * Find the coordinates of a character in the 5x5 table
 *
 * @param {String} char - The character to find
 * @param {Array} data - The 5x5 table
 * @returns {Object} An object with the x and y coordinates of the character
 */
export function findCoordinates(char, data) {
  let x, y;
  data.forEach((row, yPos) => {
    row.forEach((val, xPos) => {
      if (val === char) {
        x = xPos;
        y = yPos;
      }
    });
  });
  return { x, y };
}

/** RULE 1 - If both letters are the same (or only one letter is left), add an "X" after the first letter.
 *  Encrypt the new pair and continue. Some variants of Playfair use "Q" instead of "X", but any letter, itself
 *  uncommon as a repeated pair, will do.*/
export function handleRepeatingAndSingleLetters(digram) {
  if (digram.length === 1) {
    digram += "x";
  }

  if (digram[0] === digram[1]) {
    digram = `${digram[0]}x`;
  }

  return digram;
}


/** RULE 2 - If the letters appear on the same row of your table, replace them with the letters to their
 *  immediate right respectively (wrapping around to the left side of the row if a letter in the original pair
 *  was on the right side of the row). */
export function handleLettersOnSameRow(digram, data, x1, y1, x2, y2) {
  if (y1 === y2) {
    x1 = x1 === 4 ? 0 : x1 + 1;
    x2 = x2 === 4 ? 0 : x2 + 1;
    digram = `${data[y1][x1]} + ${data[y2][x2]}`;
  }
  return { x1, y1, x2, y2, digram };
}

/** RULE 3 - If the letters appear on the same column of your table, replace them with the letters
 *  immediately below respectively (wrapping around to the top side of the column if a letter in the original
 *  pair was on the bottom side of the column). */
export function handleLettersOnSameColumn(digram, data, x1, y1, x2, y2) {
  if (x1 === x2) {
    y1 = y1 === 4 ? 0 : y1 + 1;
    y2 = y2 === 4 ? 0 : y2 + 1;
    digram = `${data[y1][x1]} + ${data[y2][x2]}`;
  }
  return { x1, y1, x2, y2, digram };
}

/** RULE 4 - If the letters are not on the same row or column, replace them with the letters
 *  on the same row respectively but at the other pair of corners of the rectangle defined by the original pair.
 * The order is important – the first letter of the encrypted pair is the one that lies on the same row as the
 * first letter of the plaintext pair. */
export function handleLettersNotOnSameRowOrColumn(digram, data, x1, y1, x2, y2) {
  const tempX = x1;
  x1 = x2;
  x2 = tempX;
  return { x1, y1, x2, y2, digram };
}
