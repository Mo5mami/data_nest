// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  "Create 4 Invisible User Experiences you Never Knew About",
];
var website = [
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"',
];
var server = [
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"',
];
var Datasets = [
  {
    id: 0,
    name: "first",
    desc: "Imagine all the eatables, living in conFusion!",
  },
  {
    id: 1,
    name: "second",
    desc: "Imagine all the eatables, living in conFusion!",
  },
  {
    id: 3,
    name: "third",
    desc: "Imagine all the eatables, living in conFusion!",
  },
];

var contributions = [
  {
    id: 0,
    name: "first",
    numberOfSubmissions: "50",
  },
  {
    id: 1,
    name: "second",
    numberOfSubmissions: "100",
  },
  {
    id: 3,
    name: "third",
    numberOfSubmissions: "10",
  },
];

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server,
  //this is used to create datasets lists in DataSets - Home
  Datasets,
  //this is used to create contributions lists in Contributions - Home

  contributions,
};
