# Ai Webpage Builder

[![styled with: Prettier](https://img.shields.io/badge/styled_with-prettier-purple)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/Licence-MIT-teal)](https://opensource.org/licenses/MIT)

#### This is a webpage builder SPA application that uses OpenAI API to generate HTML, CSS and JavaScript code and combine it into a working web page.

### Important notes 
- Still in development. This new version aims to add server side in order to protect the API from the client and store chat history.

### Project Demo previous stage (Updated version coming soon)
https://github.com/user-attachments/assets/39f5e75c-cdb0-47eb-8e98-1da768a64e3b

## Table of Content
- [🔬 Technologies used](#🔬-technologies-used)
- [🎬 How it works](#🎬-how-it-works)
- [🔧 Installation](#🔧-installation)
- [⚙️ Frontend architecture](#⚙️-frontend-architecture)
- [⚙️ Backend architecture](#️⚙️-backend-architecture)
- [🚀 FUTURE Development:](#🚀-future-development)
- [📐Fixes and updates:](#📐-fixes-and-updates)

## 🔬 Technologies used

| Category    | Technologies                                                |
| ----------- | ----------------------------------------------------------- |
| Frontend    | `React`, `TypeScript`                                       |
| Server      | `Node`, `Express`, `Cookie-parser`, `Body Parser`, `openai` |
| UI          | `Tailwind Css`,                                             |
| API Request | `Axios`                                                     |
| Tools       | `Git`, `Vite`, `ESLint`, `Prettier`, `npm`, `npx tsx`,      |


## 🎬 How it works

- The user enters a prompt in the text area.
- The prompt is sent to the OpenAI API.
- The OpenAI API generates a response.
- The response is parsed into HTML, CSS and JavaScript code.
- The code is injected into the webpage and displayed.

## 🔧 Installation

1. Clone the repository.
2. Install the dependencies for both the server and the client projects
   - For the server
        ```bash
        cd ./server && npm install
        ```
   - For the client 
        ```bash
        cd ./client && npm install
        ```

1. Setup environment variables for the server:
    - Create `.env` file in the server folder
    - Add those env variables and update with your OpenAi api key
  
        ```
        OPEN_AI_ENDPOINT=https://api.openai.com/v1./chat/completions
        PORT=3000
        OPENAI_API_KEY=`your key goes here`
        OPEN_AI_MODEL=`provide GPT model here according to your plan` default is `gpt-4o-mini`
        ```
    - Consider changing `OPEN_AI_MODEL` according to your plan. For reference [OpenAi rate limit docs](https://platform.openai.com/settings/organization/limits)
  
2. There is config vscode which starts the projects automatically, but you can do it manually as well:
   - For the server
  
        ```bash
        cd ./server && npm start
        ```
   - For the client 
  
        ```bash
        cd ./client && npm run dev
        ```

3. Lastly navigate to [http://localhost:5173](http://localhost:5173) in order to open the application


## ⚙️ **Frontend architecture**

Featured based folder structure

- #### 🎣 Custom Hooks

  - **useChatHandlers(setSourceCode, setCurrentTab)** - *Accepts two setter functions, to update the source code in Preview Tab and switch to it when the generation is complete. Used to handle the chat section and stream the generation code to Code Tab*

- #### 🙋‍♀️ Services

  - **aiService.getSteamData(message)** - *Makes a request to the server with the user prompt*

- #### 🧮 Utils

  - Constants

      - **api.ts** - *holds baseURL and endpoints to the server*
      - **chat.ts** - *holds the initial chat message from the assistant*

## ⚙️ **Backend architecture**

- #### 🛠 Express config

    - **index.ts** - base file of the project
    - **routes.ts** - contains express routes

- #### 🛫 Routes 

    | Name   | Route url          | Description                                       |
    | ------ | ------------------ | ------------------------------------------------- |
    | Main   | `/api/**`          | Main router that combines all routes under `/api` |
    | OpenAi | `/api/completions` | Completions router for the text generations       |

- #### 📡 Controllers

    -   **getCompletions** - *Gets the prompt from the client and calls the generateWebsite service, then returns the response to the client*


- #### 🙋‍♀️ Services

    - **generateWebsite(userMessage)** - *Creates a new instance of OpenAI and makes a request to the openAI API to get generations*

- #### ⌨️ Middlewares

    - **body-parser** - *for global parse any request to json*

- #### 🧮 Utils

  - Constants

    - **instructions.ts** - *openAi instructions for system message and initial state of massage array*

## 🚀 FUTURE Development:

1. Add versioning of generated code 
2. Create navigation folder structure of the project available to the user

## 📐Fixes and updates:

- [ ] Fix passing the array message for consecutive prompts
- [x] add steaming data
- [x] finish chat styles and fix scrolling issues
- [x] push previous messages in arr and provide them to the model (expensive on tokens, there is a limit)
- [x] update proms engineering for system instructions
- [x] while generating code switch to code tab and show the code generation process when ready switch back to preview
- [ ] brainstorm on history dropdown implementation
- [ ] add history dropdown

