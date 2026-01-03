import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wkoif1w4',
    dataset: 'production'
  },
  deployment: {
    appId: 'n51z740qxmgylzms0wcqgqj7',
    autoUpdates: true,
  }
})
