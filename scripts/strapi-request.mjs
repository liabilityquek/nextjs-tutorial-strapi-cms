import { writeFileSync } from "node:fs";
import qs from "qs";

const url =
  "http://localhost:1337/api/reviews" +
  "?" +
  qs.stringify(
    { //have to use fields based on strapi documentation
      fields: ["slug", "title", "subtitle", "publishedAt"],
      populate: {
        image: {
          fields: ["url"],
        },
        pagination: { pageSize: 6 },
        sort: ['publishedAt:desc'],
      },
      //   populate: '*' //query all fields
    },
    {
      encodeValuesOnly: true,
    }
  );

// console.log("url:", url);
const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = "scripts/strapi-request.json";
writeFileSync(file, formatted, "utf8");
