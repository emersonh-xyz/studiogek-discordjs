module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        console.log(`${client.user.tag} is now ready`)

        // Create a timer of 5 minutes to check for new 
        setTimeout(client.checkVideo, 300000);

    }
}