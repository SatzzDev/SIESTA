/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _ | __/ _ |/ _ | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
const commands = [];
const handler = [];
const PREFIX = '^[.,!]'
function Cmd(info, func) {
  const types = ['image', 'text', 'video', 'sticker', 'audio'];

  const infos = {
    onlyOwner: info.onlyOwner ?? false,
    onlyPrem: info.onlyPrem ?? false,
    onlyGroup: info.onlyGroup ?? false,
    onlyAdmins: info.onlyAdmins ?? false,
    onlyPm: info.onlyPm ?? false,
    limit: info.limit ?? false,
    glimit: info.glimit ?? false,
    desc: info.desc ?? '',
    type: info.type ?? 'misc',
    dontAddCommandList: info.dontAddCommandList ?? false,
    function: func
  };

  if (!info.on && !info.command) {
    infos.on = 'message';
    infos.fromMe = false;
  } else {
    if (info.on) {
      infos.on = info.on;
      if (info.command) {
        infos.command = new RegExp(info.command);
      }
    } else {
      infos.command = new RegExp(info.command);
    }
  }

  // Check for existing command with the same name and command
  const existingCommandIndex = commands.findIndex(cmd => cmd.name === infos.name && cmd.command.toString() === infos.command.toString());

  // If an existing command is found, replace it with the new command
  if (existingCommandIndex !== -1) {
    commands[existingCommandIndex] = infos;
  } else {
    // If no existing command is found, add the new command to the array
    commands.push(infos);
  }

  return infos;
}
function Handler(func) {
    const infos = {
      function: func,
      on: 'message',
      fromMe: false
    };

    handler.push(infos);
    return infos; // Return the infos object
}

module.exports = {
	Cmd,
	commands,
    Handler,
    handler,
}
