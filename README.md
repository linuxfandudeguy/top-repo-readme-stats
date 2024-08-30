

<div align=center>
  <img src="https://cdn.icon-icons.com/icons2/903/PNG/512/stats_icon-icons.com_69449.png" alt="logo"/>

# top-repo-readme-stats  
<a href="https://vercel.com">
  <img src="powered-by-vercel.svg" alt="vercel logo" width="200" />
</a>

[![Deploy](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRemiixInc%2Fscreenshot)

</div>

> <img src="alert.svg" alt="icon" width="20" /> **Alert**:  
> This API uses caching by using [**`node-cache`**](https://github.com/node-cache/node-cache) and caches data for 10 minutes in order to prevent hitting GitHub API rate limits. As a result, the statistics might not update in real time.

This project was heavily influenced by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats/tree/master) and borrows its design inspiration from it.  
Special thanks to [anuraghazra](https://github.com/anuraghazra) for the design inspiration and overall project inspiration.

## Features

- **Top Repositories Display**: Showcases your most popular repositories based on stars.
- **Caching Mechanism**: Prevents excessive API requests to GitHub by caching the data for 10 minutes using `node-cache`.
- **Easy Integration**: Simple setup for embedding in your GitHub profile README.
- **Customizable**: Modify the API and UI as needed to fit your preferences.

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your_github_username/top-repo-readme-stats.git
    cd top-repo-readme-stats
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the GitHub API Key**:
    - You need to specify a GitHub API Key in the environmental variables, and it must be specifically named `GITHUB_API_KEY`. Create a `.env` file in the root directory and add your GitHub API key like this:
    ```env
    GITHUB_API_KEY=your_github_api_key
    ```

4. **Add `.env` to your `.gitignore`**:
    - Before publishing or republishing the repository, make sure to add `.env` to your `.gitignore` file to prevent accidentally committing sensitive information.

5. **Start the server**:
    ```bash
    npm start
    ```
    By default, the application will run on `http://localhost:3000`.

## Deployment

To deploy this application using Vercel, you should use the Vercel CLI and ensure that you have a proper `vercel.json` configuration file. Here's a guide for deploying on Vercel:

1. **Login to Vercel**:
    - Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

2. **Install the Vercel CLI**:
    - If you haven't already installed the Vercel CLI, do so by running:
    ```bash
    npm install -g vercel
    ```

3. **Configure `vercel.json`**:
    - Create a `vercel.json` file in the root directory of your project to specify your deployment settings. Here’s an example configuration:
    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "index.js",
          "use": "@vercel/node"
        }
      ],
      "env": {
        "GITHUB_API_KEY": "@github_api_key"
      }
    }
    ```
    - Replace `"@github_api_key"` with your actual GitHub API Key in the Vercel dashboard.

4. **Deploy the project**:
    - To deploy your project, use the following command:
    ```bash
    vercel
    ```
    - Follow the prompts to complete the deployment process.

## Usage

To use this in your profile README file, ensure you’ve already created your README. If you have done that, place the following HTML snippet in the desired section of your README:

```html
<img src="https://popularrepostats.vercel.app/popular-repos?username=your_github_username" alt="most popular repositories"/>
```

Replace `your_github_username` with your actual GitHub username.

<details>
<summary>:eyes: <strong>Show examples</strong></summary>

![GitHub popular repo linuxfandudeguy](https://popularrepostats.vercel.app/popular-repos?username=linuxfandudeguy)
![GitHub popular repo 2.0 octocat](https://popularrepostats.vercel.app/popular-repos?username=octocat)
![GitHub popular repo 3.0 tandpfun](https://popularrepostats.vercel.app/popular-repos?username=tandpfun)
![GitHub popular repo 4.0 github](https://popularrepostats.vercel.app/popular-repos?username=github)
</details>

## Customization

You can customize the appearance and functionality of the API by modifying the source code. For example, you can:

- Change the caching duration.
- Modify the API endpoints to display additional data.
- Customize the appearance of the repository cards.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/new-feature
    ```
3. **Commit your changes**:
    ```bash
    git commit -m "Add some feature"
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature/new-feature
    ```
5. **Open a pull request**.

## License

This project is licensed under the MIT License. If you plan to republish or fork this repository, you must adhere to the terms of the MIT license. Additionally, ensure that `.env` is included in your `.gitignore` file to avoid exposing sensitive information.

