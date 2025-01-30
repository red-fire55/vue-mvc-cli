## Changelog

### **v1.0.2 (2025-01-29)**

#### **New Features**
- **Add**: Introduced the ability to create controllers using the command:
  ```sh
  vue-mvc create:controller <name> -m -v
  ```
  This creates a controller with default methods (`index`, `create`, `update`, `delete`, `show`), a model with a base interface, and automatically creates a view folder.

- **Add**: You can now create models, views, and controllers independently using the following commands:
  - `vue-mvc create:model <name>`
  - `vue-mvc create:view <name>`
  - `vue-mvc create:controller <name>`

- **Add**: Auto-generation of routes for controllers. The newly created controller is automatically imported and used in the main `router` file.

#### **Bug Fixes**
- **Fix**: Corrected the installation command by replacing `npm install -g vue-mvc` with `npm install -g vue-mvc-cli`.

---

This update improves the Vue MVC CLI tool by enabling developers to easily create controllers, models, views, and auto-generate routes, all while maintaining a clean project structure.