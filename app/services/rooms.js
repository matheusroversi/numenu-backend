import fs from "fs";
import request from "request";

const roomFilePath = "../file/menu.categories.web.json";

const fetchFromFile = () => new Promise((resolve, reject) => {
  try {

    const roomsData = fs.readFileSync(roomFilePath);
    const roomsDetail = JSON.parse(roomsData);

    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = (env) => new Promise((resolve, reject) => {
  try {
    const roomsData = env.ROOMS_DATA;
    const roomsDetail = JSON.parse(roomsData);
    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromRemote = (env) => {
  const url = env.ROOMS_DATA;

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

const fetchRooms = (strategy) => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    case "REMOTE":
      return fetchFromRemote(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
