exports.run = (client, message, args) => {
    const filter = (reaction, user) => {
        return ['🇾', '🇳'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.channel.send(`Set this as the Discord-Picker channel?`)
        .then(botMessage => {
            botMessage.react('🇾')
                .then(() => botMessage.react('🇳'))
                .then(() => botMessage.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '🇾') {
                            message.reply('you reacted with a thumbs up.');
                        } else {
                            message.reply('you reacted with a thumbs down.');
                        }
                    })
                    .catch(collected => {
                        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                        message.reply('you didn\'t react with neither a yes or no.');
                    }))
        })
        .catch(console.error);
}