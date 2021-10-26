import { CACHE_PATH } from "@/config/constants";
import { Octokit } from "@octokit/core";
import cacheManager from "cache-manager";
import fsStore from "cache-manager-fs-hash";

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: CACHE_PATH,
    subdirs: true,
    ttl: 60 * 60 * 24 /* seconds */,
    zip: false,
  },
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const slugifyRequest = (route, options) => {
  let mergedStr = route;

  for (const [key, value] of Object.entries(options)) {
    mergedStr = mergedStr.replace(`{${key}}`, value);
  }

  return mergedStr;
};

const octokitRequest = async (route, options) => {
  const responseKey = slugifyRequest(route, options);

  console.log("CACHE MISS", responseKey);

  const { data } = await octokit.request(route, options);

  return data;
};

export const getResponse = (route, options) => {
  const responseKey = slugifyRequest(route, options);

  console.log("CACHE HIT", responseKey);

  return diskCache.wrap(responseKey, () => {
    return octokitRequest(route, options);
  });
};

const deleteResponse = async (key) => {
  console.log("DELETE CACHED", key);

  await diskCache.del(key);
};
