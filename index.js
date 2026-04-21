const { KeepAlive } = require("./keep_alive")
require("dotenv").config();
const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder 
} = require("discord.js");

const config = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const statuses = [
  "🌐 WEB • EN PROCESO",
  "⭐ IP SYSTEM • EN PROCESO",
  "🛒 TIENDA • EN PROCESO",
];

client.once("ready", () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);

  // 🔥 STATUS DEL BOT
  let i = 0;

  client.user.setActivity(statuses[i], { type: 0 });

  setInterval(() => {
    i = (i + 1) % statuses.length;
    client.user.setActivity(statuses[i], { type: 0 });
  }, 5000);
});

client.on("guildMemberAdd", async (member) => {

  // 🟣 AUTOROL
  try {
    const rol = member.guild.roles.cache.get(config.rolAuto);
    if (rol) await member.roles.add(rol);
  } catch (error) {
    console.log("❌ Error en autorol:", error);
  }

  // 🟢 BIENVENIDA PRO
  const canal = member.guild.channels.cache.get(config.canalBienvenida);
  if (!canal) return;

  const embed = new EmbedBuilder()
    .setColor("#FBD43C")
    .setAuthor({ 
      name: `Bienvenido/a a ${member.guild.name}` 
    })
    .setDescription(
`Antes de iniciar tu proceso, revisa la información del servidor:

📌 **ENLACES OFICIALES**
> 📢 <#${config.canales.anuncios}>
> 📜 <#${config.canales.normas}>
> 📌 <#${config.canales.info}>

Una vez leído, podrás continuar correctamente.

👤 Usuario: ${member}
🆔 ID: ${member.id}`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: "𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗰𝗶𝗼́𝗻 | 𝗦𝘁𝗲𝗹𝗮𝗿𝗠𝗖 𝗡𝗲𝘁𝘄𝗼𝗿𝗸" })
    .setTimestamp();

  canal.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);