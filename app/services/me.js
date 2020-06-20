import fs from "fs";
import request from "request";

const fetchFromFile = () =>
  new Promise((resolve, reject) => {
    try {
      const meData = fs.readFileSync(
        fs.readFileSync(new URL(`file://file/menu.me.web.json`))
      );
      const meDetail = JSON.parse(meData);

      resolve(meDetail);
    } catch (error) {
      console.log('##', error)
      reject(error);
    }
  });

const fetchFromEnvironment = (env) =>
  new Promise((resolve, reject) => {
    try {
      const meData = env.me_DATA;
      const meDetail = JSON.parse(meData);
      resolve(meDetail);
    } catch (error) {
      reject(error);
    }
  });

const fetchFromRemote = (env) => {
  const url = env.me_DATA;

  return new Promise((resolve, reject) => {
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
  });
};

const fetchme = (strategy) => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    case "REMOTE":
      return fetchFromRemote(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchme;
