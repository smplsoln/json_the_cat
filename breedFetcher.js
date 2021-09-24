const request = require('request');

const progName = 'breedFetcher';

const catApiRefUri = 'https://docs.thecatapi.com/';

/*
const getBreedIdArg = () => {
  let breedId = process.argv[2];
  return breedId; // 'sibe'
};
let uriSearchByBreedId = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedSearchStr}`;
*/

/**
 * Asyn cat breed description fetcher.
 * @param {*} breedSearchStr : string : Cat breed search string: cat breed name or id.
 * @param {*} callback : Calback method that will be called after fetching the cat breed description: (error, description) => {  } : error: will be null if successful or the error while fetching, description: will contain the description string of the cat breed or will be null on error.
 *
 * @returns
 */
const fetchBreedDescription = function(breedSearchStr, callback) {

  if (!breedSearchStr) {
    let InvalidArgumentError = new Error(`Invalid breed search string provided: ${breedSearchStr} for ${progName}. Please provide the valid cat breed information to search, as the first argument. Ref: ${catApiRefUri} for more details on valid cat breed Ids.`);
    callback(InvalidArgumentError, null);
    return;
  }

  let uri = `https://api.thecatapi.com/v1/breeds/search?q=${breedSearchStr}`;
  request(uri, (requestErr, response, contentBody) => {
    if (requestErr) {
      let RequestApiError = new Error(requestErr);
      callback(RequestApiError, null);
      return;
    }
    // let resposneStatusMsg = response.statusCode + ' : ' + response.statusMessage;
    // console.log({ resposneStatusMsg });

    // console.log({contentBody});
    if (!contentBody || contentBody === '') {
      let NoContentError = new Error(`Error: No content returned: ${contentBody}`);
      console.error(`Didn't get any information on the breed ${breedSearchStr} : ${NoContentError}`);
      callback(NoContentError, null);
      return;
    }

    let breedObjs = JSON.parse(contentBody);
    if (!breedObjs || !Array.isArray(breedObjs) || breedObjs.length === 0) {
      let NotFoundError = new Error(`Error: Cat breed ${breedSearchStr} not found: ${contentBody}`);
      console.error(`Unable to find information about the breed: ${NotFoundError}`);
      callback(NotFoundError, null);
      return;
    }
    let breedObj = breedObjs[0];
    let breedName = breedObj.name;
    let breedDescription = breedObj.description;
    let breedDescriptionObj = {breedName, breedDescription};
    let breedDescriptionObjStr = JSON.stringify(breedDescriptionObj);
    // console.log(typeof breedObj , {breedObj}, {breedDescription});
    // console.log(`Successfully fetched the information for the ${breedSearchStr} cat breed.`);
    // console.log(`Breed information: ${breedDescription}`);

    callback(null, breedDescriptionObjStr);
  });
};

module.exports = { fetchBreedDescription };