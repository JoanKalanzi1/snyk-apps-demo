const { InstallProvider } = require('@slack/oauth');
import { Envars } from "../../types";

// initialize the installProvider
const installer = new InstallProvider({
  clientId: process.env[Envars.slackclientid] as string,
  clientSecret: process.env[Envars.ClientId] as string,
  stateSecret: 'my-state-secret'
});

installer.generateInstallUrl({
  // Add the scopes your app needs
  scopes: ['channels:read',
'chat:write','chat:write.customize','emoji:read','incoming-webhook','channels:read' ]
})
