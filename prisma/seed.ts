//@ts-nocheck
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const customers = [
  'Wallet Wonders',
  'Encrypted Exchange',
  'Hash Hacienda',
  'Public Key Party',
  'Satoshi Boulevard',
  'Key Keepers',
  'Big-Endians',
  'Small-Endians',
];

const reportCategories = ['Blockchain', 'SmartContract', 'WebsiteApplication'];
const severityLevels = ['Critical', 'High', 'Medium', 'Low', 'None'];
const statuses = ['Reported', 'Escalated', 'Confirmed', 'Paid', 'Closed'];

// List of fake first names
const firstNames = [
  'Sara',
  'Eliza',
  'Sarah',
  'Easton',
  'Christian',
  'Andrea',
  'Mackenzie',
  'Jade',
  'Oliver',
  'Emma',
  'James',
  'Sophia',
  'Mason',
  'Isabella',
  'Liam',
  'Amelia',
  'Lucas',
  'Evelyn',
];

// Function to randomly select a name from the list
function getRandomName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

// Function to generate a WhiteHat with a random name and email based on the project domain
function generateWhiteHat(project) {
  const firstName = getRandomName();
  const email = `${firstName.toLowerCase()}@${project.name
    .toLowerCase()
    .replace(/\s+/g, '')}.io`;
  return { username: firstName, email };
}

async function main() {
  const projectRecords = [];

  // Create projects
  for (const customer of customers) {
    const project = await db.project.create({
      data: { name: customer },
    });
    projectRecords.push(project);
  }

  const whiteHatRecordsByProject = {}; // Group whitehats by project

  // Create 5 WhiteHats per project
  for (const project of projectRecords) {
    whiteHatRecordsByProject[project.id] = [];
    for (let i = 0; i < 5; i++) {
      const { username, email } = generateWhiteHat(project);
      const whiteHat = await db.whiteHat.create({
        data: {
          username,
          email,
          projectId: project.id, // Establish the relationship with the project
        },
      });
      whiteHatRecordsByProject[project.id].push(whiteHat); // Group WhiteHats by their project
    }
  }

  // Generate report data
  const reportsData = [];

  for (let i = 0; i < 5; i++) {
    const project = projectRecords[i % projectRecords.length];
    const whiteHats = whiteHatRecordsByProject[project.id];
    const whiteHat = whiteHats[i % whiteHats.length]; // Select whitehat for the correct project

    reportsData.push({
      severity: 'Critical',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: reportCategories[
        Math.floor(Math.random() * reportCategories.length)
      ],
      projectId: project.id,
      whiteHatId: whiteHat.id,
      submissionDate: new Date(),
    });
  }

  for (let i = 0; i < 10; i++) {
    const project = projectRecords[i % projectRecords.length];
    const whiteHats = whiteHatRecordsByProject[project.id];
    const whiteHat = whiteHats[i % whiteHats.length];

    reportsData.push({
      severity:
        severityLevels[Math.floor(Math.random() * severityLevels.length)],
      status: 'Escalated',
      type: reportCategories[
        Math.floor(Math.random() * reportCategories.length)
      ],
      projectId: project.id,
      whiteHatId: whiteHat.id,
      submissionDate: new Date(),
    });
  }

  for (let i = 0; i < 10; i++) {
    const project = projectRecords[i % projectRecords.length];
    const whiteHats = whiteHatRecordsByProject[project.id];
    const whiteHat = whiteHats[i % whiteHats.length];

    reportsData.push({
      severity:
        severityLevels[Math.floor(Math.random() * severityLevels.length)],
      status: 'Paid',
      type: reportCategories[
        Math.floor(Math.random() * reportCategories.length)
      ],
      projectId: project.id,
      whiteHatId: whiteHat.id,
      submissionDate: new Date(),
    });
  }

  for (let i = 0; i < 2; i++) {
    const project = projectRecords[i % projectRecords.length];
    const whiteHats = whiteHatRecordsByProject[project.id];
    const whiteHat = whiteHats[i % whiteHats.length];

    reportsData.push({
      severity: 'None',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: reportCategories[
        Math.floor(Math.random() * reportCategories.length)
      ],
      projectId: project.id,
      whiteHatId: whiteHat.id,
      submissionDate: new Date(),
    });
  }

  for (let i = 0; i < 20; i++) {
    const project = projectRecords[i % projectRecords.length];
    const whiteHats = whiteHatRecordsByProject[project.id];
    const whiteHat = whiteHats[i % whiteHats.length];

    reportsData.push({
      severity:
        severityLevels[Math.floor(Math.random() * severityLevels.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: reportCategories[
        Math.floor(Math.random() * reportCategories.length)
      ],
      projectId: project.id,
      whiteHatId: whiteHat.id,
      submissionDate: new Date(),
    });
  }

  // Insert reports into the database
  for (const reportData of reportsData) {
    await db.report.create({
      data: reportData,
    });
  }

  console.log('Database seeded 🌱 successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
