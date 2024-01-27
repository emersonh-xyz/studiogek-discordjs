const fs = require('fs');
function increaseSkullCount(user, userId, count) {

    const scoreboard = JSON.parse(fs.readFileSync(`${__dirname}/../json/skulls.json`));

    for (let i = 0; i < scoreboard.length; i++) {
        if (scoreboard[i].user === user) {
            // logic for updating current users info
            const newCount = scoreboard[i].count + count;
            const payload = { user: user, userId: userId, count: newCount };

            scoreboard[i] = payload;

            fs.writeFileSync(`${__dirname}/../json/skulls.json`, JSON.stringify(scoreboard));

            return;
        }
    }

    // logic for adding a new user to the scoreboard
    const payload = { user: user, userId: userId, count: count };

    const updatedScoreboard = [...scoreboard, payload];

    fs.writeFileSync(`${__dirname}/../json/skulls.json`, JSON.stringify(updatedScoreboard));

    return;
};

module.exports = increaseSkullCount;