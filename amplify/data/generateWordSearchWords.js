export function request(ctx) {
	const theme = ctx.args.theme
	const prompt = `Generate  an array of 10 words related to ${theme}. Also return a 1-2 word title.`
	return {
		resourcePath: '/model/anthropic.claude-3-sonnet-20240229-v1:0/converse',
		method: 'POST',
		params: {
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				messages: [
					{
						role: 'user',
						content: [{ text: prompt }],
					},
				],
				toolConfig: {
					toolChoice: { tool: { name: 'generateWordAndTitle' } },
					tools: [
						{
							toolSpec: {
								inputSchema: {
									json: {
										type: 'object',
										properties: {
											words: {
												type: 'array',
												items: { type: 'string' },
											},
											title: {
												type: 'string',
											},
										},
										required: ['words', 'title'],
									},
								},
								name: 'generateWordAndTitle',
							},
						},
					],
				},
			},
		},
	}
}

export function response(ctx) {
	// Parse the response body
	const responseBody = JSON.parse(ctx.result.body)
	const toolRes = responseBody.output.message.content[0].toolUse.input
	return {
		words: toolRes.words,
		title: toolRes.title,
	}
}
