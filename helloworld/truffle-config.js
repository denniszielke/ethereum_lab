module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    azure: {
      host: "demo.westeurope.cloudapp.azure.com",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
