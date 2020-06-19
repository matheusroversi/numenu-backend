import fs from "fs";
import request from "request";

const roomFilePath = "../file/menu.categories.web.json";

const fetchFromFile = () => new Promise((resolve, reject) => {
  try {

    const categoriesData = fs.readFileSync(roomFilePath);
    const categoriesDetail = JSON.parse(categoriesData);

    resolve(categoriesDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = (env) => new Promise((resolve, reject) => {
  try {
    const categoriesData = env.categories_DATA;
    const categoriesDetail = JSON.parse(categoriesData);
    resolve(categoriesDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromRemote = (env) => {
  const url = env.categories_DATA;

  return new Promise(((resolve, reject) => {
    request(url, (error, response, body) => {
      // in addition to parsing the value, deal with possible errors
      if (error) return reject(error);
      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  }));
};

const fetchcategories = (strategy) => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    case "REMOTE":
      return fetchFromRemote(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchcategories;
