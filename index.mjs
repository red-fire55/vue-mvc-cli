#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { Command } from "commander";
import chalk from "chalk";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .version("1.0.3")
  .description("Vue MVC TypeScript File Structure Generator");

program.command("create:project <project-name>").action((projectName) => {
  createProject(projectName);
});

program
  .command("create:controller <name>")
  .option("-m, --model", "Create associated model")
  .option("-v, --view", "Create associated view")
  .action((name, options) => {
    if (!name.endsWith("s")) {
      console.log(
        chalk.red("❌ Error: Name must end with 's' (e.g., users, cars, etc.)")
      );
      process.exit(1);
    }
    createController(name, options.model, options.view);
  });

program.command("create:view <name>").action((name) => {
  createView(name);
});

program.command("create:model <name>").action((name) => {
  if (!name.endsWith("s")) {
    console.log(
      chalk.red("❌ Error: Name must end with 's' (e.g., users, cars, etc.)")
    );
    process.exit(1);
  }
  createModel(name);
});

program.parse(process.argv);

function createProject(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red("❌ Error: Folder already exists!"));
    process.exit(1);
  }

  console.log(
    chalk.green(`📂 Creating Vue MVC TypeScript structure in ${projectName}...`)
  );

  // Directories
  const dirs = [
    "src/models",
    "src/views",
    "src/controllers",
    "src/components",
    "src/store",
    "src/router",
    "src/assets",
  ];

  dirs.forEach((dir) => fs.ensureDirSync(path.join(projectPath, dir)));

  // Default package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    scripts: {
      start: "vite",
      build: "vite build",
      serve: "vite preview",
    },
    dependencies: {
      vue: "^3.2.31",
      "vue-router": "^4.0.0",
    },
    devDependencies: {
      typescript: "^4.4.0",
      "@vitejs/plugin-vue": "^1.0.0",
      vite: "^2.5.0",
    },
    type: "module",
  };

  // Write package.json
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Default TypeScript files
  const defaultFiles = {
    "src/models/User.ts": `export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Fetches user data from the API.
 * @returns Promise<User[]>
 */
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}`,

    "src/controllers/UserController.ts": `import { ref } from "vue";
import { fetchUsers, User } from "../models/User";

export function useUserController() {
  const users = ref<User[]>([]);

  /**
   * Loads users from API and updates the users state.
   */
  const loadUsers = async (): Promise<void> => {
    users.value = await fetchUsers();
  };

  return { users, loadUsers };
}`,

    "src/views/HomeView.vue": `<script setup lang="ts">
import { useUserController } from "../controllers/UserController";

const { users, loadUsers } = useUserController();
loadUsers();
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
  </div>
</template>`,

    "src/router/index.ts": `import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: RouteRecordRaw[] = [{ path: "/", component: HomeView }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});`,

    "src/main.ts": `import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");`,

    "src/App.vue": `<template>
  <router-view />
</template>`,
  };

  // Write files
  for (const [file, content] of Object.entries(defaultFiles)) {
    fs.writeFileSync(path.join(projectPath, file), content);
  }

  console.log(
    chalk.green("✅ Vue MVC TypeScript structure created successfully!")
  );
}

function createController(name, createModelFlag, createViewFlag) {
  const modelName = name.slice(0, -1); // إزالة 's' من الاسم

  // Controller content with default methods
  const controllerContent = `import { ref } from "vue";
import { ${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  } } from "../models/${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }";

export function use${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }Controller() {
  const ${modelName.toLowerCase()}s = ref<${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }[]>([]);

  const index = async (): Promise<void> => {
    // Implement index logic
  };

  const create = async (): Promise<void> => {
    // Implement create logic
  };

  const update = async (): Promise<void> => {
    // Implement update logic
  };

  const deleteItem = async (): Promise<void> => {
    // Implement delete logic
  };

  const show = async (): Promise<void> => {
    // Implement show logic
  };

  return { ${modelName.toLowerCase()}s, index, create, update, deleteItem, show };
}`;

  fs.writeFileSync(
    path.join(
      process.cwd(),
      "src",
      "controllers",
      `${modelName.charAt(0).toUpperCase() + modelName.slice(1)}Controller.ts`
    ),
    controllerContent
  );

  if (createModelFlag) createModel(name);
  if (createViewFlag) createView(name);

  // Add router file for the controller
  const routerContent = `import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }View from "../views/${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }View.vue";

const routes: RouteRecordRaw[] = [{ path: "/${name}", component: ${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }View }];

export const ${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  }Router = createRouter({
  history: createWebHistory(),
  routes,
});`;

  fs.writeFileSync(
    path.join(
      process.cwd(),
      "src",
      "router",
      `${modelName.charAt(0).toUpperCase() + modelName.slice(1)}Router.ts`
    ),
    routerContent
  );

  // Modify main router to include the new route
  const mainRouterFile = path.join(process.cwd(), "src", "router", "index.ts");
  let mainRouterContent = fs.readFileSync(mainRouterFile, "utf-8");
  mainRouterContent = mainRouterContent.replace(
    /const routes: RouteRecordRaw\[\] = \[.*\];/s,
    (match) => {
      return match.replace(
        "];",
        `, { path: "/${name}", component: ${
          modelName.charAt(0).toUpperCase() + modelName.slice(1)
        }View }];`
      );
    }
  );
  fs.writeFileSync(mainRouterFile, mainRouterContent);

  console.log(chalk.green(`✅ Controller ${modelName} created successfully!`));
}

function createView(name) {
  const viewContent = `<template>
  <h1>${name.charAt(0).toUpperCase() + name.slice(1)} View</h1>
</template>

<script setup lang="ts">
import { use${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Controller } from "../controllers/${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Controller";

const { ${name} } = use${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Controller();
</script>`;

  fs.writeFileSync(
    path.join(
      process.cwd(),
      "src/views",
      `${name.charAt(0).toUpperCase() + name.slice(1)}View.vue`
    ),
    viewContent
  );

  console.log(
    chalk.green(
      `✅ View ${
        name.charAt(0).toUpperCase() + name.slice(1)
      }View.vue created successfully!`
    )
  );
}

function createModel(name) {
  const modelName = name.slice(0, -1); // Remove the 's' for the interface

  const modelContent = `export interface ${
    modelName.charAt(0).toUpperCase() + modelName.slice(1)
  } {
  id: number;
  name: string;
  email: string;
}`;

  fs.writeFileSync(
    path.join(
      process.cwd(),
      "src/models",
      `${modelName.charAt(0).toUpperCase() + modelName.slice(1)}.ts`
    ),
    modelContent
  );

  console.log(
    chalk.green(
      `✅ Model ${
        modelName.charAt(0).toUpperCase() + modelName.slice(1)
      }.ts created successfully!`
    )
  );
}
