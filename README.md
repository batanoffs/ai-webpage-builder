# Ai Webpage Builder

This is a webpage builder SPA application that uses OpenAI's GPT-4 to generate HTML, CSS and JavaScript code for building a webpage. Build with React, Typescript and Tailwind CSS.


https://github.com/user-attachments/assets/39f5e75c-cdb0-47eb-8e98-1da768a64e3b

Helper libraries:
- axios
- dotenv

## How it works

- The user enters a prompt in the text area.
- The prompt is sent to the OpenAI API.
- The OpenAI API generates a response.
- The response is parsed into HTML, CSS and JavaScript code.
- The code is injected into the webpage and displayed.

## Installation

- Clone the repository.
- Install the dependencies with `npm install`.
- Create your env variable from openAi API and add it as VITE_OPENAI_API_KEY="your api key"
- Start the server with 
  ```bash
    npm run dev
  ```

  then navigate to `http://localhost:3000`



## Services - in service folder the file `openAI.ts`, there are two functions:
- **getCompletions(messages)** - Uses JSON schema set in the request. This function accepts all messages from the current conversation between the user and the AI and returns the response. This is the service which doest not stream data
- **getSteamData(messages, setSourceCode)** - Uses fetch, instead of axios because axios does not support streams in the client side. This function accepts all messages from the current conversation and setter function to update the source code. This is the service which streams the data

Note: 
- **The active service for streaming data is `getSteamData()`**
- *Please consider that the function without streaming `getCompletions()` is commented out, but working as expected*
- *both services work, but the one with steam data has some issues splitting the code from the description*

## Hooks 
  - **useChatHandlers(setSourceCode, setCurrentTab)** - accepts two setter functions, one to update the source code and the other to update the current tab. This hook is used to handle the chat section. When the user talks with the ai. It updates the source code and the current view tab.

TODO:
- [x] add steaming data
- [x] finish chat styles and fix scrolling issues
- [x] push previous messages in arr and provide them to the model (expensive on tokens, there is a limit)
- [ ] in the json schema add history tracking
- [x] update proms engineering for system instructions
- [x] while generating code switch to code tab and show the code generation process when ready switch back to preview
- [ ] brainstorm on history dropdown implementation
- [ ] add history dropdown
