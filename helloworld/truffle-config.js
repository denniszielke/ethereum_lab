module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    azure: {
      host: "dzbckq6a5.westeurope.cloudapp.azure.com",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
