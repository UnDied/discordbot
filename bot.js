const Discord = require('discord.js');
const client = new Discord.Client();
const Rcon = require('modern-rcon');
const rcon = new Rcon("127.0.0.1" /* ← Ркон айпи*/, 25569 /* ← Ркон порт*/, "РКОН ПАРОЛЬ" /* ← Ркон пароль*/, 5000);
let token = "токен";
client.login(token);

client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.channel.type.toLowerCase() == 'dm') {
		msg.channel.send("``Консоль`` › ``Тут бота использовать нельзя!``");
		return;
	}
	if (msg.channel.id != "569947791187640330") {
		msg.channel.send("``Бот`` › ``Используй бота в канале #комманды-ботов``");
		return;
	}
	if(msg.content == "/cmd") {
		msg.channel.send("``Консоль`` › ``Используй так: /cmd <Твоя комманда>``");
	} else {
		let rolename = msg.guild.roles.find(`name`, `Ркон` /* ← Там где `RCON` - название роли которая сможет использовать бота*/);
		if(msg.content.startsWith("/cmd ")) {
			if(!msg.member.roles.has(rolename.id)) {
				msg.channel.send("``Консоль`` › ``Нет прав :c``");
				msg.channel.send("``Консоль`` › ``Купите (СоВладелец) на сайте: ToffiCraft.ru``");
				console.log("Пользователь с айди " + msg.author.id + " попытался использовать бота, но у него недостаточно прав.");
		    	return;
			}
			if(args.length == 0) {
				msg.channel.send("``Консоль`` › ``Используй так: /cmd <Твоя комманда>``");
			} else {
				var blacklist = [];
                blacklist[0] = "Блять";
				blacklist[1] = "Пизда";
				blacklist[2] = "Пидор";
				blacklist[3] = "Сука";
                for(var i = 0; i < blacklist.length; i++) {
                    if(args.toLowerCase().includes(blacklist[i].toLowerCase())) {
                        msg.delete();
                        msg.channel.send("``Бот`` › ``Не выражайся!``");
						let role = msg.guild.roles.find(`name`, `Нарушитель`);
						msg.member.addRole(role.id);
                        return;
                        break;
                    } else {
						rcon.connect().then(() => {
							return rcon.send(args); //Не трогать
						}).then(res => {
							msg.channel.send("``Консоль`` › ``Ответ от сервера:``");
							console.log("Пользователь с айди " + msg.author.id + " использует комманду /" + args);
							msg.channel.send('```' + res + '```');
						}).then(() => {
							return rcon.disconnect();
						});
					}
                }
			}
		}
	}
});
