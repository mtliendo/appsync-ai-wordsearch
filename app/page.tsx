'use client'
import { WordSearchGeneratorComponent } from '@/components/word-search-generator'

import { generateClient } from 'aws-amplify/data'
import { type Schema } from '../amplify/data/resource'
import Footer from '@/components/footer'

const client = generateClient<Schema>()

function Home() {
	const handleGenerateWords = async (theme: string) => {
		const res = await client.queries.generateWordSearchWords({ theme })

		console.log('Generated words:', res.data)
		return res.data
	}
	return (
		<>
			<WordSearchGeneratorComponent onGenerateWords={handleGenerateWords} />
			<Footer />
		</>
	)
}

export default Home
