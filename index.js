let { fetchBreedDescription } = require('./breedFetcher');

const getBreedNameQueryString = () => process.argv[2];
let breedSearchStr = getBreedNameQueryString();
// breedSearchStr = 'sibe';

const descriptionHandler = (err, description) => {
  if (err) {
    console.log(`Error fetching information on the breed ${breedSearchStr} !`);
    console.log({ err });
    return;
  }
  console.log({ description });
};

fetchBreedDescription(breedSearchStr, descriptionHandler);

