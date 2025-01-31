# `vue-mvc-cli`

A command-line tool for generating a **Vue MVC TypeScript file structure** in your project. This package helps you quickly scaffold a Vue application with TypeScript, following the MVC architecture, making it easier to start organizing your application with a clear separation of concerns.

---

## Features

- Generates a **Vue 3** project with a structured **MVC** setup.
- **TypeScript** support with default **interfaces** and **params**.
- Creates essential folders and files for **models**, **views**, **controllers**, and **components**.
- Ready to use with **Vue Router** for navigation.
- Pre-configured with a simple **example model**, **controller**, and **view** to get you started.
- Supports the creation of **controllers**, **views**, and **models** through separate commands with customizable flags for methods and views.

---

## Installation

### Option 1: Install Globally

You can install the `vue-mvc` package globally using `npm` to use it across multiple projects:

```sh
npm install -g vue-mvc-cli
```

### Option 2: Install Locally in an Existing Project

If you want to install it within a specific project:

```sh
npm install /path/to/your/vue-mvc-cli
```

Alternatively, you can link the package globally with `npm link` and then link it in your project.

---

## Usage

Once installed, you can generate a new **Vue MVC TypeScript** structure or create individual components using the following commands:

### Command to create a new project:
```sh
vue-mvc create:project <name>
```

This will create a new directory with the name `<name>`, and it will generate the following structure:

```
<name>/ 
├── src/
│   ├── components/
│   ├── controllers/
│   ├── models/
│   ├── router/
│   ├── store/
│   ├── views/
│   └── assets/
├── package.json
├── tsconfig.json
└── README.md
```

### Command to create a new controller:
```sh
vue-mvc create:controller <name> -m -v
```

This command will:
- Create a controller with the default 5 methods: `index`, `create`, `update`, `delete`, `show`.
- Generate a model with a base interface named after the entered controller name (in singular form).
- Create a folder in `views/` for the new controller's views.
- Modify the `router` by adding a new router file with the entered name, and importing it in the main router file.

### Command to create only views:
```sh
vue-mvc create:view <name>
```

This command will create the corresponding view for the entered name in the `views/` folder.

### Command to create only controllers:
```sh
vue-mvc create:controller <name>
```

This command will create only the controller for the entered name in the `controllers/` folder.

### Command to create only models:
```sh
vue-mvc create:model <name>
```

This command will create only the model for the entered name in the `models/` folder.

---

## Example Usage

1. To create a new project named `my-vue-app`:

```sh
vue-mvc create:project my-vue-app
```

2. To create a controller and model for `plans` with views:

```sh
vue-mvc create:controller plans -m -v
```

3. To create only a view for `plans`:

```sh
vue-mvc create:view plans
```

---

## Project Structure

The generated project will contain the following basic structure:

- **`src/models/`**: Contains the TypeScript interfaces and models for your application.
- **`src/controllers/`**: Contains the logic for fetching and managing data.
- **`src/views/`**: Contains the Vue components (views) for your application.
- **`src/router/`**: The Vue Router configuration file.
- **`src/store/`**: State management for your application (using Vuex or Composition API state).
- **`src/assets/`**: For static files like images, styles, etc.

---

## Customization

You can customize the generated files based on your needs. For example, you can modify the default model or controller templates to fit your application’s logic.

---

## Contributing

Feel free to submit issues, pull requests, or improvements to this package.

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and test them.
4. Submit a pull request with a detailed description of your changes.

---

## Contact

For any inquiries or support, feel free to reach out:

- **Email**: mahmod.salah9413@gmail.com  
- **WhatsApp**: [Chat with me](https://wa.me/+201112115404)  
- **LinkedIn**: [Mahmod Salah](https://www.linkedin.com/in/mahmod-salah-00213a1a0/)  

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
