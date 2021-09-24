// breedFetcherTest.js

const { fetchBreedDescription } = require('../breedFetcher');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      // const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      const expectedDescObjStr = '{"breedName":"Siberian","breedDescription":"The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors. "}';
      // compare returned description
      assert.equal(expectedDescObjStr, desc.trim());

      done();
    });
  });


  it('returns an error for a non-existing breed, via callback', (done) => {
    const breedSearchStr = 'XYZABCD123456';
    const contentBody = '[]';
    fetchBreedDescription(breedSearchStr, (err, desc) => {
      // we expect no error for this scenario
      assert.equal(desc, null);
      assert.exists(err);

      let NotFoundError = new Error(`Error: Cat breed ${breedSearchStr} not found: ${contentBody}`);
      assert.equal(err.toString(), NotFoundError.toString());

      done();
    });
  });

});