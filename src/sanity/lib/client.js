import { createClient } from 'next-sanity'

import { apiVersion} from '../env'

const client = createClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion,
  useCdn: false,
})
export default client
