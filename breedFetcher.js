const request = require('request');


/*
const getBreedIdArg = () => {
  let breedId = process.argv[2];
  return breedId; // 'sibe'
};
let uriSearchByBreedId = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedSearchStr}`;
*/
const catApiRefUri = 'https://docs.thecatapi.com/';

const getBreedNameQueryString = () => process.argv[2];
let breedSearchStr = getBreedNameQueryString();

if (!breedSearchStr) {
  console.log(`Invalid breedSearchStr argument: ${breedSearchStr} in command ${process.argv[1]}. Please provide the valid cat breed information, as the first argument to the breedFetcher command.`);
  console.log(`Ref: ${catApiRefUri} for more details on valid cat breed Ids.`);
  return;
}

let uri = `https://api.thecatapi.com/v1/breeds/search?q=${breedSearchStr}`;
request(uri, (requestErr, response, contentBody)=>{
  if (requestErr) {
    console.log(`Error fetching information on the breed ${breedSearchStr} !`);
    console.log({requestErr});
    return;
  }
  let resposneStatusMsg = response.statusCode + ' : ' + response.statusMessage;
  console.log({resposneStatusMsg});

  // console.log({contentBody});
  if (!contentBody || contentBody === '') {
    console.log(`Didn't get any information on the breed ${breedSearchStr}`);
  }

  let breedObjs = JSON.parse(contentBody);
  if (!breedObjs || !Array.isArray(breedObjs) || breedObjs.length === 0) {
    console.log(`Unable to find information about the breed: ${breedSearchStr} : ${contentBody}`);
    return;
  }
  let breedObj = breedObjs[0];
  let breedDescription = breedObj.description;
  let breedName = breedObj.name;
  // console.log(typeof breedObj , {breedObj}, {breedDescription});
  console.log(`Successfully fetched the information for the ${breedName} cat breed.`);
  console.log(`Breed information: ${breedDescription}`);

});