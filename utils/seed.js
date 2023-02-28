const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected!');
    // clear out existing db before populating 
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [
        {
            username: 'jesshong',
            email: 'jess@email.com'
        },
        {
            username: 'khiemnguyen',
            email: 'khiem@email.com'
        },
        {
            username: 'edwardtian',
            email: 'edward@email.com'
        },
        {
            username: 'iriskim',
            email: 'iris@email.com'
        },
        {
            username: 'sophiasong',
            email: 'sophia@email.com'
        },
    ];

    const thought = [
        {
            thoughtText: "I think it's cool ...",
            username: 'sophiasong',
        },
        {
            thoughtText: "I think it's cool ...",
            username: 'jesshong',
        },
        {
            thoughtText: "I think it's cool ...",
            username: 'khiemnguyen',
        },
        {
            thoughtText: "I think it's cool ...",
            username: 'iriskim',
        },
    ];

    // insert users and thoughts into db
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thought);

    // console log users and thoughts as a table + finish seeding + exit
    console.table(users);
    console.table(thought);
    console.info('Seeding complete!');
    process.exit(0);
});