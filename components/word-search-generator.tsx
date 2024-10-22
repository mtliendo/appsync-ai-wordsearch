'use client'

import { useState } from 'react'
import WordSearch from '@blex41/word-search'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { type Schema } from '../amplify/data/resource'

type WordSearchGeneratorComponentProps = {
	onGenerateWords: (
		theme: string
	) => Promise<Schema['generateWordSearchWords']['type']>
}
export function WordSearchGeneratorComponent({
	onGenerateWords,
}: WordSearchGeneratorComponentProps) {
	const [columns, setColumns] = useState(8)
	const [rows, setRows] = useState(8)
	const [theme, setTheme] = useState('')
	const [words, setWords] = useState('')
	const [grid, setGrid] = useState<string[][]>([])
	const [wordBank, setWordBank] = useState<string[]>([])

	const generateWords = async () => {
		if (!theme) return
		const data = await onGenerateWords(theme)
		setWords(data?.words.join() as string)
	}

	const generateGrid = () => {
		const dictionary = words.split(',').map((word) => word.trim())
		//remove the empty string if it exists
		if (dictionary.at(-1) === '') {
			dictionary.pop()
		}
		const options = {
			cols: columns,
			rows,
			disabledDirections: ['SE', 'SW'], //only backwards, and backwards diagonals allowed
			dictionary,
			upperCase: true,
		}
		const ws = new WordSearch(options)
		const pickedWords = ws.data.words.map((word: { clean: true }) => word.clean)
		setGrid(ws.data.grid)

		setWordBank(pickedWords)
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 p-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="flex space-x-4">
					<div className="flex-1">
						<Label htmlFor="columns">Columns:</Label>
						<Input
							id="columns"
							type="number"
							value={columns}
							onChange={(e) => setColumns(Number(e.target.value))}
							className="bg-gray-800 text-white"
						/>
					</div>
					<div className="flex-1">
						<Label htmlFor="rows">Rows:</Label>
						<Input
							id="rows"
							type="number"
							value={rows}
							onChange={(e) => setRows(Number(e.target.value))}
							className="bg-gray-800 text-white"
						/>
					</div>
				</div>

				<div>
					<Label htmlFor="theme">Enter a theme to autogenerate:</Label>
					<Input
						id="theme"
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						className="bg-gray-800 text-white"
					/>
				</div>

				<Button
					onClick={generateWords}
					className="bg-pink-500 hover:bg-pink-600"
				>
					Generate Words
				</Button>

				<div>
					<Label htmlFor="words">Words (comma-separated):</Label>
					<Textarea
						id="words"
						value={words}
						onChange={(e) => setWords(e.target.value)}
						className="bg-gray-800 text-white"
					/>
				</div>

				<div className="flex space-x-4">
					<Button
						onClick={generateGrid}
						className="bg-blue-500 hover:bg-blue-600"
					>
						Generate Grid
					</Button>

					<Button
						onClick={() => window.print()}
						className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
					>
						Print Grid
					</Button>
				</div>

				{grid.length > 0 && (
					<div className="printable-grid bg-white p-4 rounded">
						<table className="w-full">
							<tbody>
								{grid.map((row, i) => (
									<tr key={i}>
										{row.map((cell, j) => (
											<td
												key={j}
												className="border border-gray-300 w-8 h-8 text-center text-black"
											>
												{cell}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{wordBank.length > 0 && (
					<div>
						<h2 className="text-xl font-bold mb-2">Word Bank:</h2>
						<div className="flex flex-wrap gap-2">
							{wordBank.map((word, index) => (
								<span key={index} className="bg-gray-700 px-3 py-1 rounded">
									{word}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
