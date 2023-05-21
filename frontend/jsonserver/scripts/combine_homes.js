// The back end export of homes_index.json caps out at 30 homes, which excludes many in assignments_index.json
// This script creates the rest based on the assignments data

const assignments = require('../data/assignments_index.json');
const homes = require('../data/homes_index.json');

const newHomes = new Map();

assignments.forEach((assignment) => {
  assignment.homes.forEach((home) => {
    if (home.id > 30 && !newHomes.has(home.id)) {
      const newHome = home;
      newHome.assignment_id = assignment.id;
      newHome.url = `http://localhost:3000/homes/${home.id}.json`;
      newHomes.set(home.id, newHome);
    }
  });
});

console.log(
  JSON.stringify([...homes, ...newHomes.values()].sort((a, b) => a.id - b.id))
);
