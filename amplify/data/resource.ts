import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
	AIGeneration: a.customType({
		words: a.string().array().required(),
		title: a.string().required(),
	}),
	generateWordSearchWords: a
		.query()
		.arguments({ theme: a.string().required() })
		.returns(a.ref('AIGeneration'))
		.authorization((allow) => [allow.publicApiKey()])
		.handler(
			a.handler.custom({
				dataSource: 'BedrockDataSource',
				entry: './generateWordSearchWords.js',
			})
		),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	schema,
	name: 'appsync-ai-wordsearch',
	authorizationModes: {
		defaultAuthorizationMode: 'apiKey',
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
})
