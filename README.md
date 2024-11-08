# AI Wordsearch Generator

## Overview

The AI Wordsearch Generator is a web application that allows users to create custom wordsearch puzzles. Users can enter their desired rows and columns, as well as a theme, and the application will generate a set of 10 words related to that theme. These words are then populated into a word bank, and users can click a "create grid" button to generate a wordsearch puzzle based on those words.

The application also includes a "print" button that allows users to print the wordsearch puzzle and word bank.

## Tech Stack

The AI Wordsearch Generator is built using the following technologies:

- **Hosting**: AWS Amplify
- **API**: AWS AppSync, which provides a direct integration with Amazon Bedrock for the language model
- **Language Model**: Claude (but can be configured to use a different model)
- **Frontend**: NextJS, with the help of the V0 UI library
- **Backend**: AWS Amplify Gen 2

## Contributing

If you're interested in contributing to the AI Wordsearch Generator project, please open an issue first so we can discuss your proposed changes. We welcome contributions from the community and look forward to collaborating on this project.
