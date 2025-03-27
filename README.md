# Practice English App

Welcome to **Practice English App**! 🎉

This is the frontend application for practicing English through movie dialogues. Built with Next.js, it provides an intuitive interface for users to search movie dialogues, practice pronunciation, and track their learning progress.

## Features

- **Movie Dialogue Search**: Browse and search for dialogues from your favorite movies
- **Interactive Practice**: Record and compare your pronunciation with original movie audio
- **Progress Tracking**: View your practice history and improvement over time
- **User Authentication**: Secure login with Google authentication
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have installed:

- Node.js 18.x or later
- npm or yarn package manager
- Access to the Practice English API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/phytter/app-practice-english.git
    cd app-practice-english
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure environment variables:
    Create a `.env` file with the following variables:
    ```
    NEXT_PUBLIC_API_URL=your_api_url
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    ```

## Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

## Building for Production
To create a production build:

```bash

npm run build
# or
yarn build

```

Then start the production server:

```bash


npm run start
# or
yarn start
```

## Running Tests

Execute the test suite with:

```bash

npm run test
# or
yarn test
```

### Technologies Used

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- NextAuth.js

## Related Projects

- [API Practice English - Backend for this application](https://github.com/phytter/api-practice-english)

- [Infrastructure Practice English - Infra as code for this application](https://github.com/phytter/infrastructure-practice-english)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Enjoy practicing your English with movie dialogues! 🎬📚

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.