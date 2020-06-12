const agents = [
  {
    id: 1,
    name: "tpyett0",
    username: "jabriel",
    hostname: "ionode",
    pid: 6,
    connected: false,
    createdAt: "2020-03-31",
    updatedAt: "2020-01-08",
  },
  {
    id: 2,
    name: "saspy1",
    username: "jaimito",
    hostname: "ionode",
    pid: 8,
    connected: true,
    createdAt: "2020-03-26",
    updatedAt: "2019-11-10",
  },
  {
    id: 3,
    name: "hstroton2",
    username: "jirafales",
    hostname: "ionode-server2",
    pid: 2,
    connected: true,
    createdAt: "2019-07-06",
    updatedAt: "2019-06-18",
  },
  {
    id: 4,
    name: "bmckeighen3",
    username: "jose",
    hostname: "ionode-server2",
    pid: 4,
    connected: false,
    createdAt: "2020-02-12",
    updatedAt: "2019-09-02",
  },
  {
    id: 5,
    name: "calvis4",
    username: "jorge",
    hostname: "tests",
    pid: 9,
    connected: false,
    createdAt: "2019-05-06",
    updatedAt: "2019-05-08",
  },
];

const newAgent = {
  name: 'neo',
  username: 'matrix',
  hostname: 'ionode',
  pid: 6,
  connected: true,
  createdAt: '2020-02-13',
  updatedAt: '2020-04-20'
}

module.exports = {
  newAgent,
  findOne: agents[0],
  findAll: agents,
  findConnected: agents.filter((agent) => agent.connected),
  findByUsername: (username) =>
    agents.filter((agent) => agent.username === username),
  findById: (id) => agents.find((agent) => agent.id === id),
};
