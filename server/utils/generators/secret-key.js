const firstRandomNumbers = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

const firstRandomLetters = Math.random()
  .toString(36)
  .substring(2, Date.now() * firstRandomNumbers);

const secondRandomNumbers = Math.floor(
  (Math.random() * firstRandomNumbers + Date.now()) * firstRandomNumbers
);

const secondRandomLetters = Math.random()
  .toString(36)
  .substring(2, firstRandomNumbers + Date.now());

const generatedKey = `${firstRandomLetters}${secondRandomNumbers}${secondRandomLetters}`;

module.exports = generatedKey;
