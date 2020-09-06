const config = {};

config.host = process.env.HOST || "https://portfoliodb.documents.azure.com:443/";
config.authKey =
  process.env.AUTH_KEY || "Yub2LYLDNkJriGm6iNboj9m3EUvIrY8GmITuuANpLKOm0FFt41lHAQQmHI2ZnagMyAfQYzVq3tpX5GhFht2GmA==";
config.databaseId = "techPiratesApplication";
config.containerId = "Users";
config.partitionKey = { kind: "Hash", paths: ["/category"] };
if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;
