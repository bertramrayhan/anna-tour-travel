import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index.js'

export default defineConfig({
  name: 'default',
  title: 'anna-tour-travel',

  projectId: 'wkoif1w4',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
