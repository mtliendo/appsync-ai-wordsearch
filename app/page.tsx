'use client'
import { WordSearchGeneratorComponent } from '@/components/word-search-generator'

import { generateClient } from 'aws-amplify/data'
import { type Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

function Home() {
	const handleGenerateWords = async (theme: string) => {
		const res = await client.mutations.generateWordSearchWords(
			{
				theme,
			},
			{ authMode: 'apiKey' }
		)

		console.log('Generated words:', res.data)
		return res.data
	}
	return (
		<>
			<WordSearchGeneratorComponent onGenerateWords={handleGenerateWords} />
			<footer className="p-4 text-center text-gray-500">
				© 2024 Made with ❤️ by{' '}
				<a
					href="https://focusotter.com"
					className="underline hover:text-green-700"
				>
					Focus Otter
				</a>
				. All rights reserved.
			</footer>
		</>
	)
}

export default Home
