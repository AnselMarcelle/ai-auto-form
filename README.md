# About
This project allows you to send multiple questions to GPT-3.5 and receive multiple answers at once. You can extract questions from an HTML file and get the answers saved in a text file.

# Prerequisites
- [Node.js](https://nodejs.org/) and npm installed
- OpenAI API Key: Get your API key at https://platform.openai.com/account/api-keys

# Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/gpt-multiple.git
    cd gpt-multiple
    ```
1. Create a `.env` file in the project root folder and fill it with your OpenAI API key:
    ```bash
    OPENAI_API_KEY=yourapikey
    ```
1. Place your HTML file with questions inside the `data` folder.
1. Install the required dependencies:
    ```bash
    npm install
    ```

# Usage

1. Extract the questions from the HTML file and save them in the `questions.txt` file:

# Customization

You can customize the extraction of questions from the HTML file by modifying the `src/core/extractText.ts` file. For example, you can change the class name for the `span` elements containing the questions.

You can also customize the GPT-3.5 settings, such as temperature and max tokens, by modifying the `src/core/generateAnswer.ts` file.

