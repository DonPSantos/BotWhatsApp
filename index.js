const wa = require('@open-wa/wa-automate');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();


wa.create({
  sessionId: "XABLAU",
  multiDevice: false, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: true,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  //Ta dando erro, não sei o que é
  client.onGlobalParticipantsChanged(async (participantChangedEvent) => {
    if(participantChangedEvent.action === 'add')
      await client.sendTextWithMentions(participantChangedEvent.chat,`entrou`);

    if(participantChangedEvent.action === 'remove')
      await client.sendTextWithMentions(participantChangedEvent.chat,`saiu`);
  });
  client.onMessage(async message => {
    if(message.body.toLowerCase() == 'qual a boa' || message.body.toLowerCase() == 'qual a boa?'){
      await client.sendText(message.from, 'Sua mãe aquela cachorrra.');
    }
    if(message.body[0] == '#'){
      switch(message.body.toLowerCase()){
        case '#menu':
          var menuText = `Segue a lista de comando seus punheteiros: 
          #box - Convoca geral
          #negao - Wess pedindo pica preta
          #putinho - vence uma discussão
          #random - putaria aleatoria
          O resto aqui é auto explicativo, se não for eu também não sei o que é.
          #anal
          #cuzinho
          #peitos
          #wtf
          #sensual`
          await client.sendText(message.from, menuText);
        break;
        case '#box':
          let contatos = await client.getGroupMembers(message.from)
          let texto = 'Convocando todos os cornos 🐂 🐂 🐂.\n \n'

          contatos.forEach(element => {
            texto = texto.concat('@', element.id, '\n')
          }); 
          texto = texto.replaceAll("@c.us","")

          await client.sendTextWithMentions(message.from,`${texto}`);
        break;
        case '#negao':
          await client.sendAudio(message.from, 'https://drive.google.com/uc?export=download&id=1LKweSA8zAA0cGWqcBn3i-sn6WUQGc5_Y')
        break;
        case '#putinho':
          await client.sendAudio(message.from, 'https://drive.google.com/uc?export=download&id=1qtv0NaC1RbJnmHRcaAvM8IZnoSVddJ0Z')
        break;
        case '#random':
          const RandomHub = require('random-hub').RandomHub;
          const hub = new RandomHub();
          await client.sendVideoAsGif(message.from,hub.getRandomHub(),'some file.mp4', `Porra de whats buga gif`);
        break;
        case '#vaginas':
          let image1 = await nsfw.pussy();
          await client.sendVideoAsGif(message.from,image1,'some file.mp4', ``);
        break;
        case '#anal':
          let image3 = await nsfw.anal();
          await client.sendVideoAsGif(message.from,image3,'some file.mp4', ``);
        break;
        case '#cuzinho':
          const image4 = await nsfw.ass();
          await client.sendVideoAsGif(message.from,image4,'some file.mp4', ``);
        break;
        case '#wtf':
          let image5 = await nsfw.gonewild();
          await client.sendVideoAsGif(message.from,image5,'some file.mp4', ``);
        break;
        case '#peitos':
          let image6 = await nsfw.boobs();
          await client.sendVideoAsGif(message.from,image6,'some file.mp4', ``);
        break;
        case '#sensual':
          let image9 = await nsfw.lewd();
          await client.sendVideoAsGif(message.from,image9,'some file.mp4', ``);
        break;
        default:
          await client.reply(message.from, 'Quié Zé ?!', message.id);
        break;
      }
    }
  });
}
