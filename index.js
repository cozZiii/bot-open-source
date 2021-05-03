const express = require('express');
const app = express();
app.get(".", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`); // PING
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on("message", message => { //RESPONDE MSG
if (message.author.bot) return;
if (message.channel.type == 'dm')
return
if(message.content == '<@ID>' || message.content == '<@!ID>') { //ID DO BOT
return message.channel.send(`${message.author}, Meu prefixo é \`!\``)
}
});

client.on("guildMemberAdd", async (member) => { //welcome
  let guild = await client.guilds.cache.get("ID"); //ID DO SERVIDOR
  let channel = await client.channels.cache.get("ID"); // ID DO CANAL
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela."); // CONSOLE LOG
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("WHITE")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setDescription(`👋 ${member.user} | **Muito bem vindo(a)!**`)
.addField('Nome:',  `\`www.teste.com.br\``, true)
.addField('Nome:',  `\`www.teste.com.br\``, true)
      .setFooter(`cozZi#6434・todos os direitos reservados`)
    channel.send(embed);
  }
});


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("guildMemberAdd", (message, member) => { // CONTADOR DE MEMBROS
  const guild = client.guilds.cache.get('838752487787200542') // ID Do SERVER
  const MEMBROS = guild.channels.cache.find(channel => channel.id === "838752702908596324").setTopic(`🧙‍♂️ Total de membros: ${guild.memberCount}!`)
})

client.on("ready", () => { //STATUS
  let activities = [
      `cozZi.exe`,
      `meu prefixo é: ${config.prefix}`,
      `Testing...`,
      `Bot de testes!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING" //os tipos são PLAYING, WATCHING, LISTENING, STREAMING
      }), 100 * 60); 
  client.user
      .setStatus("idle") //vc pode altera para online, dnd, idle, invisible
      .catch(console.error);
console.log("Estou Online!")
});


client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token cozZi#6434
