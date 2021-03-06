import fs from "fs";
import request from "request";

import productsData from "../file/menu.products.web";

const fetchFromFile = () =>
  new Promise((resolve, reject) => {
    try {
      resolve(productsData);
    } catch (error) {
      reject(error);
    }
  });

const fetchFromEnvironment = (env) =>
  new Promise((resolve, reject) => {
    try {
      const productsData = env.products_DATA;
      const productsDetail = JSON.parse(productsData);
      resolve(productsDetail);
    } catch (error) {
      reject(error);
    }
  });

const fetchFromRemote = (env) => {
  const url = env.products_DATA;

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

const fetchproducts = (strategy) => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    case "REMOTE":
      return fetchFromRemote(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchproducts;
