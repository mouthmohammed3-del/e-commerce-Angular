# Angular Fundamentals

> A complete Angular Fundamentals reference for building this E-commerce project. Use it to review what each concept is, why it's used, how it works, and how it applies here — not as a first-time tutorial.

---

## Table of Contents

1. [Angular & TypeScript Basics](#1-angular--typescript-basics)
2. [Angular Project Structure](#2-angular-project-structure)
3. [Components](#3-components)
4. [Templates & Data Binding](#4-templates--data-binding)
5. [Directives](#5-directives)
6. [Pipes](#6-pipes)
7. [Component Communication](#7-component-communication)
8. [Services](#8-services)
9. [Dependency Injection](#9-dependency-injection)
10. [Lifecycle Hooks](#10-lifecycle-hooks)
11. [Forms](#11-forms)
12. [Routing](#12-routing)
13. [Guards](#13-guards)
14. [HTTP & APIs](#14-http--apis)
15. [Observables & RxJS](#15-observables--rxjs)
16. [Authentication](#16-authentication)
17. [HTTP Interceptors](#17-http-interceptors)
18. [Standalone Components](#18-standalone-components)
19. [Change Detection](#19-change-detection)
20. [Signals](#20-signals)
21. [Angular Application Architecture](#21-angular-application-architecture)
22. [Angular Best Practices](#22-angular-best-practices)
23. [Angular Vocabulary](#angular-vocabulary)
24. [Common Errors & Solutions](#common-errors--solutions)
25. [Angular Fundamentals Checklist](#angular-fundamentals-checklist)
26. [Fundamentals Assessment Test](#fundamentals-assessment-test)

---

## 1. Angular & TypeScript Basics

### What is it?
Angular is a full front-end framework (by Google) for building Single Page Applications (SPAs) using TypeScript, components, and a strict architectural structure. TypeScript is a superset of JavaScript that adds static types, interfaces, and compile-time error checking, and Angular is written in and requires it.

### Why do we use it?
Building large, interactive apps in plain JavaScript becomes messy fast — no structure, no types, manual DOM updates. Angular provides routing, forms, HTTP, dependency injection, and testing tools out of the box, with enforced conventions that matter a lot for teams and long-lived codebases. TypeScript catches bugs before you even run the code and makes large codebases far easier to maintain and refactor.

### How does it work?
Angular compiles your TypeScript and templates into JavaScript. It watches your data and automatically re-renders the DOM when that data changes (this is **change detection**, covered in Section 19). TypeScript itself is compiled ("transpiled") down to plain JavaScript that the browser can run, with all type information stripped out.

### Syntax / Example
```typescript
// TypeScript types
let username: string = "Ali";
let age: number = 30;
let isActive: boolean = true;
let scores: number[] = [90, 85, 70];
let id: string | number = 101; // union type

// Interface
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string; // optional property
}

// Class
class ShoppingCart {
  private total: number = 0; // access modifier

  constructor(public items: Product[] = []) {} // shorthand constructor

  addToTotal(amount: number) {
    this.total += amount;
  }

  getTotal(): number {
    return this.total;
  }
}

// Decorator
@Component({
  selector: 'app-product-card',
  template: `<h1>{{ productName }}</h1>`
})
export class ProductCardComponent {
  productName = 'Wireless Headphones';
}
```

### Code Explanation
- `let id: string | number` — a **union type**: `id` can hold either a `string` or a `number`.
- `interface Product { ... }` — a contract describing the *shape* of an object. It exists only at compile time and disappears from the compiled JavaScript — it costs nothing at runtime.
- `?` after `imageUrl` — marks the property as optional.
- `private total` — an **access modifier**. `private` members are only accessible inside the class, `public` (the default) is accessible everywhere, and `protected` is accessible in the class and its subclasses. This is **encapsulation**: hiding internal details and exposing only what's needed.
- `constructor(public items: Product[] = [])` — shorthand constructor syntax that both declares and assigns the `items` property in one step.
- `@Component({...})` — a **decorator**: a special function starting with `@` that attaches metadata to a class, telling Angular how to treat it. Decorators don't change your class logic — they just attach configuration Angular reads at compile/runtime.

### E-commerce Example
In this project, `Product`, `Order`, `User`, and `CartItem` will all be defined as TypeScript interfaces, so every part of the app agrees on their shape and TypeScript can catch mistakes (like passing a `string` where a `price: number` is expected) before the code ever runs.

### Common Mistakes
- Overusing `any` — it defeats the purpose of TypeScript entirely, since you lose all type safety. Avoid it unless truly necessary.
- Doing heavy initialization logic inside a class `constructor` instead of `ngOnInit` (for Angular components specifically — see Section 10).

### Key Points
- Angular ≠ AngularJS. AngularJS (2010) is the old 1.x version; Angular (2016+) is a complete rewrite. "Angular" today always means v2+.
- Interfaces are compile-time only and free at runtime.
- Decorators attach metadata/configuration; they don't contain logic themselves.

---

## 2. Angular Project Structure

### What is it?
The standard set of files and folders an Angular CLI project generates, plus the Angular CLI tool itself (`ng`) used to create, build, test, and generate code.

### Why do we use it?
The CLI automates boilerplate (creating components, services, etc.) and enforces a consistent file structure and naming convention across the whole team — critical once more than one developer touches the codebase.

### How does it work?
`ng new` scaffolds a working project with sensible defaults. Commands like `ng generate` create new pieces (components, services, guards) following Angular's conventions automatically, wiring them into the existing app structure.

### Syntax / Example
```bash
ng new ecommerce-app                        # create a new project
ng serve                                    # run dev server (localhost:4200)
ng generate component product-card          # scaffold a component (short: ng g c product-card)
ng generate service services/product        # scaffold a service
ng build                                    # production build
```

```
ecommerce-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
├── angular.json
├── package.json
├── tsconfig.json
```

### Code Explanation
| File/Folder | Purpose |
|---|---|
| `src/` | All source code lives here |
| `app/` | Root application code — components, services, routes |
| `assets/` | Static files: images, fonts, JSON data |
| `main.ts` | Entry point — bootstraps the app into the browser |
| `app.config.ts` | App-wide configuration (providers: router, HTTP client, etc.) — used with standalone components |
| `app.routes.ts` | Route definitions (URL → component mapping) |
| `angular.json` | Build/CLI configuration |
| `package.json` | npm dependencies and scripts |
| `tsconfig.json` | TypeScript compiler configuration |

### E-commerce Example
This project's `app/` folder will be organized by feature: `products/`, `cart/`, `checkout/`, `auth/`, each containing its own components, services, and (where relevant) routes.

### Common Mistakes
- Editing `angular.json` or `tsconfig.json` without understanding the setting — can silently break the build. Change one setting at a time, carefully.
- Dumping every component into one flat folder instead of organizing by feature — becomes unmanageable as the app grows.

### Key Points
- `ng generate` (or `ng g`) is the fastest way to create consistent, correctly-wired files.
- `app.config.ts` + `app.routes.ts` replace the old `AppModule` in modern standalone Angular apps.

---

## 3. Components

### What is it?
A component controls a piece of the UI. It combines a TypeScript class (logic/data), an HTML template (view), and CSS (styling). Angular apps are trees of nested components.

### Why do we use it?
Components encourage reusable, testable, isolated pieces of UI instead of one giant tangled page.

### How does it work?
Angular reads the `@Component` decorator's metadata, renders the template, binds it to the class instance, and manages its lifecycle (see Section 10).

### Syntax / Example
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',   // custom HTML tag: <app-product-card></app-product-card>
  standalone: true,               // modern Angular: no NgModule needed
  template: `
    <div class="card">
      <h3>{{ name }}</h3>
      <p>{{ price | currency }}</p>
    </div>
  `,
  styles: [`.card { border: 1px solid #ddd; padding: 12px; }`]
})
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
}
```

### Code Explanation
- `@Component({...})` — decorator marking this class as a component and configuring it.
- `selector` — the custom tag name used to place this component in a parent template.
- `standalone: true` — this component manages its own imports (no NgModule required); the modern default since Angular 14+/17+.
- `template` — inline HTML (alternative: `templateUrl: './product-card.component.html'`).
- `styles` — inline CSS scoped only to this component (alternative: `styleUrl`).
- `export class ProductCardComponent` — the logic container; `name` and `price` are `@Input()` properties set by the parent.

### E-commerce Example
`ProductCardComponent`, `ProductListComponent`, `CartItemComponent`, `CheckoutFormComponent`, and `OrderSummaryComponent` will all be standalone components composed together to build the storefront.

### Common Mistakes
- Putting business logic (API calls, heavy calculations) directly inside components instead of services — makes components hard to test and reuse.
- Forgetting `standalone: true` and the needed `imports` array when using directives/pipes in the template (e.g., `*ngFor`, `DatePipe`).

### Key Points
- A component is only ever a class + template + styles + metadata.
- Component-to-component communication (parent/child) uses `@Input`/`@Output` — see Section 7.

---

## 4. Templates & Data Binding

### What is it?
The HTML, with special Angular syntax, that connects a component's class to what's shown on screen.

### Why do we use it?
This is how Angular keeps the UI in sync with data automatically, instead of manually calling `document.getElementById()` and updating the DOM by hand.

### How does it work?
Angular parses the template at compile time and generates code that updates the DOM whenever the bound data changes, based on the type of binding used.

### Syntax / Example
| Syntax | Name | Direction | Example |
|---|---|---|---|
| `{{ value }}` | Interpolation | Component → View | `<p>{{ productName }}</p>` |
| `[property]="value"` | Property Binding | Component → View | `<img [src]="productImage">` |
| `(event)="handler()"` | Event Binding | View → Component | `<button (click)="addToCart()">Add</button>` |
| `[(ngModel)]="value"` | Two-Way Binding | Both directions | `<input [(ngModel)]="searchTerm">` |

```html
<input [(ngModel)]="searchTerm" placeholder="Search products...">
<p>Searching for: {{ searchTerm }}</p>
<button (click)="clearSearch()">Clear</button>
<div [class.out-of-stock]="!product.inStock">{{ product.name }}</div>
```
```typescript
export class ProductsComponent {
  searchTerm = '';
  clearSearch() { this.searchTerm = ''; }
}
```

### Code Explanation
- `[(ngModel)]="searchTerm"` — "banana in a box" syntax; combines property binding `[ngModel]` with event binding `(ngModelChange)`. Typing in the input updates `searchTerm`, and changing `searchTerm` in code updates the input.
- `{{ searchTerm }}` — interpolation reads the current value and displays it, re-rendering automatically when it changes.
- `(click)="clearSearch()"` — calls the `clearSearch()` method when the button is clicked.
- `[class.out-of-stock]="!product.inStock"` — **class binding**, toggles a CSS class conditionally.
- Other bindings: **Attribute binding** (`[attr.aria-label]="label"`) for HTML attributes with no matching DOM property, and **Style binding** (`[style.color]="isDiscounted ? 'red' : 'black'"`).
- **Template reference variables**: `<input #searchBox>` then `{{ searchBox.value }}` — lets you reference a DOM element directly in the template.

### E-commerce Example
The product search bar uses two-way binding (`[(ngModel)]`), the "Add to Cart" button uses event binding, and a product's out-of-stock badge uses class binding.

### Common Mistakes
- Forgetting to import `FormsModule` when using `ngModel` in standalone components → runtime error.
- Confusing `{{ }}` (interpolation, only reads values as text) with `[ ]` (property binding, can bind to any property, not just text).

### Key Points
- Interpolation is for displaying text; property binding is for binding to any DOM property.
- Two-way binding requires `FormsModule`.

---

## 5. Directives

### What is it?
Instructions attached to DOM elements that change their appearance or behavior. There are two types: **Attribute directives** (change appearance/behavior of an existing element, e.g. `ngClass`, `ngStyle`) and **Structural directives** (change the DOM layout by adding/removing elements, e.g. `*ngIf`, `*ngFor`, or the modern `@if`/`@for`).

### Why do we use it?
They let you conditionally show/hide elements and loop over data declaratively, without manual DOM manipulation.

### How does it work?
Structural directives use a "template factory" pattern behind the scenes to add or remove chunks of the DOM. The modern `@if`/`@for`/`@switch` control-flow syntax (Angular 17+) is built directly into the template compiler and is now the preferred approach.

### Syntax / Example
```html
<!-- Modern control flow (preferred, v17+) -->
@if (isLoggedIn) {
  <p>Welcome back!</p>
} @else {
  <p>Please log in.</p>
}

@for (product of products; track product.id) {
  <li>{{ product.name }} — {{ product.price | currency }}</li>
} @empty {
  <li>No products found.</li>
}

@switch (orderStatus) {
  @case ('pending') { <p>Order pending</p> }
  @case ('shipped') { <p>Shipped</p> }
  @default { <p>Unknown status</p> }
}

<!-- Legacy syntax (still common in existing codebases) -->
<p *ngIf="isLoggedIn">Welcome back!</p>
<li *ngFor="let product of products">{{ product.name }}</li>
<div [ngClass]="{ 'out-of-stock': !product.inStock, 'on-sale': product.discount > 0 }"></div>
```

```typescript
// Custom directive
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightOffer]',
  standalone: true
})
export class HighlightOfferDirective {
  constructor() {
    const el = inject(ElementRef);
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### Code Explanation
- `track product.id` — **required** in `@for`. Tells Angular how to identify each item uniquely so it can efficiently update the list instead of re-rendering everything.
- `@empty` — a block shown only when the iterated collection is empty.
- `[ngClass]="{...}"` — an object where keys are class names and values are booleans controlling whether each class is applied.
- `HighlightOfferDirective` — a custom **attribute directive**; `[appHighlightOffer]` is the selector used as an attribute on any element (`<p appHighlightOffer>`).

### E-commerce Example
```html
@for (product of products; track product.id) {
  <app-product-card [name]="product.name" [price]="product.price" />
} @empty {
  <p>No products match your filters.</p>
}
```

### Common Mistakes
- Forgetting `track` in `@for` — this is a compile error in modern Angular.
- Trying to use `*ngIf` and `*ngFor` on the *same* element in legacy syntax — not allowed directly; requires `<ng-container>`. (This restriction was one motivation for the new `@if`/`@for` syntax, which doesn't have this problem.)

### Key Points
- Prefer `@if`/`@for`/`@switch` in new code; know `*ngIf`/`*ngFor` for reading existing codebases.
- `track` is mandatory in `@for` and should reference a stable unique identifier (like an `id`), not the array index.

---

## 6. Pipes

### What is it?
Simple functions used in templates to transform displayed data without changing the underlying value.

### Why do we use it?
Formatting data (dates, currency, case) is a very common need — pipes keep this logic out of the component class and reusable across templates.

### How does it work?
A pipe takes an input value and optional arguments, and returns a transformed value for display. Angular re-runs a pipe based on its purity: **pure** pipes (the default) only re-run when the input reference changes; **impure** pipes re-run on every change detection cycle.

### Syntax / Example
```html
{{ product.price | currency:'USD' }}      <!-- $49.99 -->
{{ order.date | date:'shortDate' }}       <!-- 9/21/26 -->
{{ product.name | uppercase }}            <!-- WIRELESS HEADPHONES -->
{{ category | lowercase }}                <!-- electronics -->
{{ product | json }}                      <!-- pretty-printed object, useful for debugging -->
{{ productName | lowercase | titlecase }} <!-- chaining pipes -->
```
```typescript
// Custom pipe
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
```

### Code Explanation
- `currency:'USD'` — the colon syntax passes an argument to the pipe (here, the currency code).
- `implements PipeTransform` — the interface every custom pipe must implement; it requires a `transform()` method.
- `transform(value: string, limit: number = 20)` — the first parameter is always the value being piped; any further parameters are the pipe's arguments (with defaults allowed).

### E-commerce Example
```html
<p>{{ product.price | currency:'USD' }}</p>
<p>{{ product.description | truncate:80 }}</p>
```

### Common Mistakes
- Writing an impure pipe (`pure: false`) for a performance-sensitive list causes major slowdowns, since it reruns constantly. Prefer immutable data updates so pure pipes work correctly instead.
- Forgetting pipe arguments use `:` not `()`.

### Key Points
- Pure pipes (default) are fast; impure pipes should be used sparingly.
- Built-in pipes: `CurrencyPipe`, `DatePipe`, `UpperCasePipe`, `LowerCasePipe`, `JsonPipe`, and more.

---

## 7. Component Communication

### What is it?
`@Input()` lets a parent component pass data down into a child. `@Output()` (with `EventEmitter`) lets a child send events/data up to the parent.

### Why do we use it?
Components need a well-defined way to pass data and events between parent and child without tightly coupling them together.

### How does it work?
`@Input()` exposes a property the parent can bind to using `[propertyName]="value"`. `@Output()` exposes an `EventEmitter` the child calls `.emit(value)` on; the parent listens using `(eventName)="handler($event)"`.

### Syntax / Example
```typescript
// product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <p>{{ productName }}</p>
    <button (click)="notifyAddToCart()">Add to Cart</button>
  `
})
export class ProductCardComponent {
  @Input() productName = '';
  @Output() addedToCart = new EventEmitter<string>();

  notifyAddToCart() {
    this.addedToCart.emit(this.productName);
  }
}
```
```html
<!-- product-list.component.html -->
<app-product-card
  [productName]="product.name"
  (addedToCart)="onAddToCart($event)">
</app-product-card>
```
```typescript
// product-list.component.ts
onAddToCart(productName: string) {
  console.log(`${productName} added to cart!`);
}
```

### Code Explanation
- `@Input() productName` — declares `productName` as a property the parent can set via `[productName]="..."`.
- `@Output() addedToCart = new EventEmitter<string>()` — declares an event the child can emit; `<string>` types the emitted payload.
- `this.addedToCart.emit(...)` — fires the event, triggering the parent's `(addedToCart)="onAddToCart($event)"` handler.
- `$event` in the parent template holds whatever value was passed to `.emit()`.

### E-commerce Example
`ProductCardComponent` emits `addedToCart` whenever its button is clicked; the parent `ProductListComponent` listens and calls a shared `CartService` to actually update the cart.

### Common Mistakes
- Trying to use `@Output` to communicate directly between sibling components — this doesn't work; you must go through a shared service or the common parent.
- Forgetting the `<string>` (or other) type on `EventEmitter` — loses type safety on the emitted value.

### Key Points
- `@Input`/`@Output` is for direct parent-child relationships only.
- For sharing data between *unrelated* components, use a **Service** instead (see Section 8).

---

## 8. Services

### What is it?
A plain TypeScript class used to hold reusable logic and data (e.g., API calls, shared state) — decoupled from any specific component.

### Why do we use it?
Services keep components lean (focused on UI) and let multiple components share the same data/logic without duplicating code.

### How does it work?
A service is just a class marked `@Injectable`. Angular's Dependency Injection system (Section 9) creates and hands out instances of it wherever it's requested.

### Syntax / Example
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('https://api.myshop.com/products');
  }

  getProductById(id: number) {
    return this.http.get<Product>(`https://api.myshop.com/products/${id}`);
  }
}
```

### Code Explanation
- `@Injectable({ providedIn: 'root' })` — marks this class as injectable and registers it as a **singleton** at the app (root) level — one shared instance across the whole app.
- `private http = inject(HttpClient)` — injects Angular's built-in `HttpClient` service into this service.
- `getProducts()` / `getProductById()` — return **Observables** (Section 15); nothing happens until a component subscribes.

### E-commerce Example
`ProductService`, `CartService`, `OrderService`, and `AuthService` will each encapsulate the logic and API calls for their respective domain, keeping components focused purely on presentation.

### Common Mistakes
- Putting business/API logic directly inside components instead of services.
- Providing a service in a component's `providers` array when a single shared instance was actually intended app-wide (see Section 9 for why this matters).

### Key Points
- Services are the standard place for shared logic, state, and API communication.
- `providedIn: 'root'` is the standard way to make a service a singleton.

---

## 9. Dependency Injection

### What is it?
A design pattern where a class *receives* the objects it depends on (like services) from an external system, rather than creating them itself.

### Why do we use it?
It decouples classes from their dependencies' implementation details, making code easier to test (you can inject a fake/mock service) and maintain.

### How does it work?
Angular has a built-in DI container. When a component or service asks for a dependency (via constructor or the `inject()` function), Angular looks it up — or creates it if needed — and hands it over.

### Syntax / Example
```typescript
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({ selector: 'app-product-list', standalone: true, template: `...` })
export class ProductListComponent {
  private productService = inject(ProductService); // modern way
  // OR: constructor(private productService: ProductService) {} // classic way

  products$ = this.productService.getProducts();
}
```

```typescript
// Component-level provider — creates a new instance scoped to this component and its children
@Component({
  selector: 'app-checkout',
  providers: [CheckoutSessionService],
  standalone: true
})
export class CheckoutComponent {}
```

### Code Explanation
- `inject(ProductService)` — the modern way to request a dependency; equivalent to the classic constructor-parameter injection but usable in more contexts (including outside constructors).
- **Provider** — tells Angular *how* to create a dependency (usually just the class itself with `providedIn`).
- **Token** — the identifier DI uses to look up a dependency (usually the class type itself).
- **Hierarchical injection** — services can be provided at root (app-wide singleton via `providedIn: 'root'`), or at a specific component level (`providers: [...]` in `@Component`), creating a *new instance* scoped to that component and its children only.

### E-commerce Example
`CartService` is provided at root so the cart state is shared across the whole app. A hypothetical `CheckoutSessionService` might instead be provided only on `CheckoutComponent`, so each checkout flow gets a fresh instance.

### Common Mistakes
- Providing a service in a component's `providers` array when you actually wanted one shared instance app-wide — this creates multiple separate instances instead of one singleton.
- Confusing "providing" a service with "importing" a module — they're different mechanisms.

### Key Points
- `providedIn: 'root'` = one instance for the whole app.
- Component-level `providers` = a new instance per component subtree.
- DI is what makes services easy to test via mocking.

---

## 10. Lifecycle Hooks

### What is it?
Special methods Angular calls automatically at specific points in a component's life (creation, updates, destruction).

### Why do we use it?
They let you run code at the right moment — e.g., fetching data once the component is ready, or cleaning up before it's destroyed — instead of guessing when things are "ready."

### How does it work?
A component implements a hook's corresponding TypeScript interface (e.g. `OnInit`) and defines the matching method (`ngOnInit()`); Angular calls it automatically at the appropriate point in the component's life.

### Syntax / Example
| Hook | Runs when | Common use |
|---|---|---|
| `ngOnChanges` | Before `ngOnInit`, and whenever an `@Input()` value changes | React to input changes |
| `ngOnInit` | Once, after the component's inputs are set | Initial data fetching/setup |
| `ngDoCheck` | On every change detection run | Custom change detection logic (rarely needed) |
| `ngAfterContentInit` | Once, after content projected via `<ng-content>` is initialized | Work with projected content |
| `ngAfterContentChecked` | After every check of projected content | — |
| `ngAfterViewInit` | Once, after the component's view (and child views) is initialized | Access `@ViewChild` elements |
| `ngAfterViewChecked` | After every check of the component's view | — |
| `ngOnDestroy` | Just before the component is removed | Cleanup: unsubscribe, clear timers |

```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';

export class ProductDetailComponent implements OnInit, OnDestroy {
  private subscription: any;
  private productService = inject(ProductService);

  ngOnInit() {
    this.subscription = this.productService.getProductById(this.id).subscribe(/* ... */);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe(); // prevent memory leaks
  }
}
```

### Code Explanation
- `implements OnInit, OnDestroy` — TypeScript interfaces that require the matching methods (`ngOnInit`, `ngOnDestroy`) to exist; this is a compile-time safety check, not strictly required for Angular to call the methods.
- `ngOnInit()` — runs once inputs are available, the right place to fetch initial data.
- `ngOnDestroy()` — runs right before the component is removed; the right place to clean up subscriptions, intervals, or event listeners.

### E-commerce Example
`ProductDetailComponent` fetches the product in `ngOnInit()` based on the route parameter, and unsubscribes from that request in `ngOnDestroy()` if the user navigates away before it completes.

### Common Mistakes
- Doing API calls / heavy setup inside the constructor instead of `ngOnInit` — inputs aren't guaranteed to be ready yet in the constructor.
- Forgetting `ngOnDestroy` cleanup (unsubscribing from Observables, clearing intervals) — causes memory leaks.
- Accessing `@ViewChild` elements in `ngOnInit` instead of `ngAfterViewInit` — they aren't available yet.

### Key Points
- `ngOnInit` and `ngOnDestroy` are the two hooks you'll use constantly; the rest are more specialized.
- Always clean up subscriptions/timers in `ngOnDestroy`.

---

## 11. Forms

### What is it?
Angular provides two approaches for handling forms: **Template-driven Forms** (built mostly in the HTML template using `ngModel`) and **Reactive Forms** (defined and controlled in the TypeScript class using `FormControl`, `FormGroup`, and `FormBuilder`).

### Why do we use it?
Forms need structured handling of values, validation, and submission state — Angular's form systems provide this instead of manually reading DOM values.

### How does it work?
**Template-driven**: Angular creates the form model behind the scenes based on `ngModel` directives in the template. **Reactive**: you explicitly build the form model (a tree of `FormControl`/`FormGroup` objects) in your component class, and the template binds to that existing model.

### Syntax / Example
```html
<!-- Template-driven -->
<form #checkoutForm="ngForm" (ngSubmit)="onSubmit(checkoutForm)">
  <input name="email" [(ngModel)]="email" required email>
  <button [disabled]="checkoutForm.invalid">Submit</button>
</form>
```

```typescript
// Reactive Forms — Checkout example
import { FormBuilder, Validators } from '@angular/forms';

export class CheckoutComponent {
  private fb = inject(FormBuilder);
  checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    }
  }
}

// Custom validator
function noSpacesValidator(control: AbstractControl) {
  return control.value?.includes(' ') ? { hasSpaces: true } : null;
}
```
```html
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
  <input formControlName="email">
  @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
    <p>Invalid email address</p>
  }
  <button [disabled]="checkoutForm.invalid">Place Order</button>
</form>
```

### Code Explanation
- `FormBuilder.group({...})` — builds a `FormGroup` (a collection of controls) from a shorthand config.
- `[initialValue, [validators]]` — each field maps to a `FormControl` with a starting value and validation rules.
- `formGroup` / `formControlName` — bind the template inputs to the reactive form model.
- `.touched`, `.dirty`, `.valid`, `.invalid` — control state flags: *touched* = the user focused then left the field; *dirty* = the value was changed; *valid/invalid* = passes/fails validators.
- `FormArray` — a dynamic list of controls/groups (e.g., adding multiple shipping addresses).

### E-commerce Example
The checkout form uses Reactive Forms with `Validators.required` and `Validators.email` on the email field, and disables the "Place Order" button until `checkoutForm.valid` is `true`.

### Common Mistakes
- Forgetting `ReactiveFormsModule`/`FormsModule` imports in standalone components.
- Not checking `.touched` before showing validation errors — shows errors before the user has even interacted with the field.

### Key Points
- Template-driven: quick, simple forms.
- Reactive: complex forms, dynamic fields, unit testing, large apps — the professional standard.

---

## 12. Routing

### What is it?
The Angular Router maps URLs to components, enabling navigation without full page reloads.

### Why do we use it?
SPAs need a way to represent different "pages" via URLs while still avoiding full page reloads — the router provides this along with parameters, nested routes, guards, and more.

### How does it work?
A `routes` configuration array maps URL paths to components. A `<router-outlet>` in the template marks where the matched component renders. Navigation can happen declaratively (`routerLink`) or programmatically (`Router.navigate()`).

### Syntax / Example
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent }, // route parameter
  { path: 'cart', component: CartComponent,
    children: [ { path: 'checkout', component: CheckoutComponent } ] }, // nested route
  { path: '**', component: NotFoundComponent } // wildcard — must be last
];
```
```html
<!-- app.component.html -->
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/cart" routerLinkActive="active">Cart</a>
</nav>
<router-outlet></router-outlet>
```
```typescript
private route = inject(ActivatedRoute);
private router = inject(Router);

ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');   // route param
  const ref = this.route.snapshot.queryParamMap.get('ref');   // ?ref=email query param
}

goToCart() { this.router.navigate(['/cart']); }                // programmatic navigation
```

### Code Explanation
- `RouterOutlet` — the placeholder where the matched component renders.
- `routerLink` — declarative navigation (avoids a full page reload).
- `routerLinkActive` — adds a CSS class when that link's route is active.
- `:id` — a route parameter (dynamic URL segment).
- `redirectTo` — e.g. `{ path: 'old-shop', redirectTo: 'shop', pathMatch: 'full' }` redirects one path to another.

### E-commerce Example
`/products/:id` renders `ProductDetailComponent` for a specific product; `/cart/checkout` is a nested route under `/cart`.

### Common Mistakes
- Putting the wildcard (`**`) route anywhere but last — it will swallow all other routes.
- Using `snapshot` when the same component can be reused for different param values (e.g., navigating between `/products/1` and `/products/2`) — the snapshot won't update; use the `paramMap` Observable instead.

### Key Points
- Always put `{ path: '**' }` last.
- `ActivatedRoute` gives access to route and query parameters.

---

## 13. Guards

### What is it?
Functions that control whether navigation to or from a route is allowed.

### Why do we use it?
To protect routes — e.g., block access to `/checkout` unless the user is logged in.

### How does it work?
A guard function (e.g. `CanActivateFn`) runs before the router activates a route. If it returns `true`, navigation proceeds; if `false`, it's blocked (and the guard typically redirects elsewhere).

### Syntax / Example
```typescript
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};
```
```typescript
{ path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] }
```

### Code Explanation
- `CanActivateFn` — the type for a functional guard (modern Angular style).
- `canActivate: [authGuard]` — attaches the guard to the route; it will run before `CheckoutComponent` is shown.

### E-commerce Example
`authGuard` protects `/checkout` and `/account`, redirecting unauthenticated users to `/login`.

### Common Mistakes
- Relying on guards *alone* for security — guards only protect the frontend route; the backend API must independently verify authorization too.

### Key Points
- Guards run before navigation completes.
- Guards are a UX/frontend safeguard, not a substitute for backend security.

---

## 14. HTTP & APIs

### What is it?
`HttpClient` is Angular's service for making HTTP requests to a backend REST API.

### Why do we use it?
Nearly every real app needs to read and write data from a server — `HttpClient` provides a consistent, testable, Observable-based way to do that.

### How does it work?
`HttpClient` methods (`get`, `post`, `put`, `patch`, `delete`) return **Observables** — nothing happens until you call `.subscribe()` on the result.

### Syntax / Example
```typescript
// app.config.ts — setup
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};
```
```typescript
private http = inject(HttpClient);

getProducts() {
  return this.http.get<Product[]>('https://api.myshop.com/products');
}
createOrder(order: Order) {
  return this.http.post<Order>('https://api.myshop.com/orders', order);
}
updateProduct(id: number, changes: Partial<Product>) {
  return this.http.patch(`https://api.myshop.com/products/${id}`, changes);
}
removeFromWishlist(id: number) {
  return this.http.delete(`https://api.myshop.com/wishlist/${id}`);
}
```

### Code Explanation
- `provideHttpClient()` — registers `HttpClient` for the app; required once in `app.config.ts`.
- `this.http.get<Product[]>(url)` — the generic `<Product[]>` types the expected response shape.
- Query params: `this.http.get('/products', { params: { category: 'electronics' } })` → `/products?category=electronics`.
- Headers: `this.http.get('/orders', { headers: { Authorization: 'Bearer token' } })`.

### E-commerce Example
`ProductService.getProducts()` performs a GET request; `OrderService.createOrder()` performs a POST when the customer checks out.

### Common Mistakes
- Forgetting to `.subscribe()` — the request never actually fires.
- Not handling errors — an unhandled failed request can silently break the UI (see `catchError` in Section 15).

### Key Points
- HTTP methods: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).
- Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.
- `HttpClient` calls are lazy — they don't run until subscribed to.

---

## 15. Observables & RxJS

### What is it?
RxJS is a library for handling asynchronous data streams. An **Observable** represents a stream of values over time that you can subscribe to.

### Why do we use it?
HTTP calls, user input events, and router events are all naturally asynchronous and can emit multiple times (unlike a Promise, which resolves once). Observables also support powerful composition via operators, and are cancellable.

### How does it work?
An Observable does nothing until `.subscribe()` is called (it's "lazy"). Operators (via `.pipe()`) transform, filter, or combine the stream before it reaches the subscriber.

### Syntax / Example
```typescript
this.http.get<Product[]>('/products').subscribe({
  next: (products) => console.log(products),
  error: (err) => console.error(err),
  complete: () => console.log('done')
});
```
```typescript
this.http.get<Product[]>('/products').pipe(
  map(products => products.filter(p => p.inStock)), // transform emitted values
  tap(products => console.log('fetched', products)), // side effect, doesn't change the stream
  catchError(err => of([]))                           // handle errors gracefully
).subscribe(products => this.products = products);

searchInput$.pipe(
  debounceTime(300),          // wait for typing to pause
  switchMap(term => this.productService.search(term)) // cancel previous request, start new one
).subscribe(results => this.searchResults = results);
```
```html
<!-- Async Pipe: auto subscribe/unsubscribe in the template -->
<div *ngFor="let product of products$ | async">{{ product.name }}</div>
```

### Code Explanation
- `Subject` — an Observable you can manually push values into (`.next(value)`).
- `BehaviorSubject` — like a `Subject` but holds a *current value* and emits it immediately to new subscribers. Great for shared state (e.g., current cart state).
- `map` — transforms each emitted value.
- `tap` — runs a side effect (like logging) without changing the emitted values.
- `catchError` — catches errors in the stream and lets you return a fallback value instead of the stream failing silently.
- `debounceTime(300)` — waits 300ms of silence before emitting, useful for search inputs.
- `switchMap` — cancels the previous inner Observable and switches to a new one, ideal for "latest request wins" scenarios like search.
- **Async Pipe** — automatically subscribes/unsubscribes in the template; the recommended way to consume Observables in views.

### E-commerce Example
The product search bar uses `debounceTime` + `switchMap` so each keystroke doesn't trigger an overlapping API request; `CartService` exposes cart state via a `BehaviorSubject` so any component can reactively display the current item count.

### Common Mistakes
- Forgetting to unsubscribe from manual `.subscribe()` calls in components (especially long-lived Subjects) — causes memory leaks. Prefer the `async` pipe or `takeUntilDestroyed()`.
- Nesting subscribes instead of using `switchMap`/`mergeMap` — creates "callback hell" and duplicate requests.

### Key Points
| | Observable | Promise |
|---|---|---|
| Values | Multiple over time | One value |
| Lazy | Yes (runs on `.subscribe()`) | No (runs immediately) |
| Cancellable | Yes (`.unsubscribe()`) | No |
| Operators | Many (map, filter, etc.) | Limited (`.then`) |

---

## 16. Authentication

### What is it?
Authentication verifies *who* a user is; authorization determines *what* they're allowed to do.

### Why do we use it?
Most real apps — including e-commerce — need to know who's logged in, keep them logged in across sessions, and protect certain routes and actions.

### How does it work?
1. The user submits a login form → `POST /auth/login`.
2. The backend returns a **JWT (JSON Web Token)**.
3. The token is stored (commonly `localStorage`, though httpOnly cookies are more secure against XSS).
4. An **AuthService** exposes the current auth state, often via a `BehaviorSubject<boolean>` or `BehaviorSubject<User | null>` so components can reactively know if the user is logged in.
5. An **Interceptor** (Section 17) automatically attaches the token to outgoing requests.
6. A **Guard** (Section 13) protects routes that require login.

### Syntax / Example
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.loggedIn$.asObservable();

  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn$.next(true);
  }
  logout() {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
  }
}
```

### Code Explanation
- `new BehaviorSubject<boolean>(...)` — initializes the login state based on whether a token already exists in storage.
- `isLoggedIn$ = this.loggedIn$.asObservable()` — exposes a read-only Observable version so other code can subscribe but not push new values directly.
- `login()` / `logout()` — update both storage and the reactive state together.

### E-commerce Example
`AuthService.isLoggedIn$` drives whether the navbar shows "Login" or "My Account"; `authGuard` (Section 13) uses `auth.isLoggedIn()` to protect `/checkout`.

### Common Mistakes
- Storing sensitive tokens in `localStorage` without understanding XSS risk — fine for learning projects, but production apps often prefer httpOnly cookies.
- Forgetting to clear stored user data on logout.

### Key Points
- Authentication = identity; Authorization = permissions.
- JWTs are commonly stored client-side and sent with each request via an interceptor.

---

## 17. HTTP Interceptors

### What is it?
Functions that intercept every outgoing HTTP request and incoming response, letting you modify or react to them globally.

### Why do we use it?
Avoids repeating the same logic (adding auth headers, logging, error handling) in every single service call.

### How does it work?
An interceptor receives the outgoing request and a `next` function representing the rest of the chain; it can modify the request, forward it, and also react to the response (or error) that comes back.

### Syntax / Example
```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(cloned);
};
```
```typescript
// app.config.ts
providers: [provideHttpClient(withInterceptors([authInterceptor]))]
```

### Code Explanation
- `req.clone({...})` — HTTP requests are immutable, so you clone the original with modifications (here, adding the `Authorization` header) rather than mutating it.
- `next(cloned)` — forwards the (possibly modified) request along the chain.
- `withInterceptors([authInterceptor])` — registers the interceptor for the whole app.

### E-commerce Example
`authInterceptor` attaches the JWT to every request to `api.myshop.com`; a second interceptor could catch `401` responses globally and redirect to `/login`.

### Common Mistakes
- Mutating the request object directly instead of using `.clone()` — requests are immutable by design.
- Forgetting to register the interceptor in `app.config.ts`.

### Key Points
- Common uses: attaching JWT tokens, global error handling, logging requests, showing/hiding a global loading spinner.

---

## 18. Standalone Components

### What is it?
Since Angular 14 (and the default since v17), components can declare their own dependencies (`imports: [...]`) directly, without needing an `NgModule`.

### Why do we use it?
Simplifies the mental model — no more `NgModule` boilerplate for small apps; clearer dependency tracking per component.

### How does it work?
Each standalone component lists exactly what it needs (`CommonModule`, other components, directives, pipes) in its own `imports` array. The app itself is bootstrapped directly from a root component and a configuration object, rather than a root `NgModule`.

### Syntax / Example
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
```
```typescript
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink], // component-level imports
  template: `...`
})
export class ProductsComponent {}
```

### Code Explanation
- `bootstrapApplication(AppComponent, appConfig)` — starts the app directly from the root component, replacing the old `platformBrowserDynamic().bootstrapModule(AppModule)` pattern.
- `ApplicationConfig` (`app.config.ts`) — holds app-wide providers (router, HTTP client, etc.).
- Component-level `imports` — each standalone component only imports what it directly uses.

### E-commerce Example
This entire project uses standalone components throughout, with `app.config.ts` registering `provideRouter(routes)` and `provideHttpClient(withInterceptors([authInterceptor]))`.

### Common Mistakes
- Forgetting to add a needed module/directive/pipe to a component's own `imports` array — it's not inherited from anywhere else.

### Key Points
- This is now the modern default way to build Angular apps — new CLI projects are standalone by default.

---

## 19. Change Detection

### What is it?
The mechanism Angular uses to detect when data changes and update the DOM accordingly.

### Why do we use it?
Without it, you'd have to manually update the DOM every time data changes — change detection automates this.

### How does it work?
Classically, Angular patches async browser APIs (via **Zone.js**) — timers, events, HTTP calls — so it knows when "something might have changed," then walks the component tree checking bindings for changes.

With the `OnPush` strategy, Angular only re-checks a component when: an `@Input()` reference changes, an event originates from inside the component, or an Observable bound via the `async` pipe emits. This skips unnecessary checks — a major performance optimization.

### Syntax / Example
```typescript
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `...`
})
export class ProductCardComponent {}
```

### Code Explanation
- `changeDetection: ChangeDetectionStrategy.OnPush` — opts this component into the more restrictive (and more performant) change detection strategy.

### E-commerce Example
A product grid rendering hundreds of `ProductCardComponent` instances benefits significantly from `OnPush`, since Angular can skip re-checking cards whose input data hasn't changed by reference.

### Common Mistakes
- Calling functions directly in templates (`{{ calculateTotal() }}`) — reruns on *every* change detection cycle, even if nothing relevant changed.
- Mutating objects/arrays in place instead of creating new references — breaks `OnPush` detection, since Angular compares by reference.

### Key Points
- `OnPush` compares inputs by reference, not by deep equality — always create new object/array references when updating data.

---

## 20. Signals

### What is it?
A Signal is a reactive value container — reading it inside a reactive context automatically tracks it as a dependency, and updating it automatically notifies anything depending on it.

### Why do we use it?
Signals are becoming the preferred way to manage local component state reactively, without the overhead of manual subscription management that Observables require.

### How does it work?
`signal()` creates a value you read by calling it like a function. `computed()` derives a new signal that recalculates automatically (and lazily) when its dependencies change. `effect()` runs a side effect automatically whenever any signal it reads changes.

### Syntax / Example
```typescript
import { signal, computed, effect } from '@angular/core';

const cartCount = signal(0);
const cartLabel = computed(() => `Cart (${cartCount()})`); // auto-recomputes when cartCount changes

effect(() => {
  console.log(`Cart count is now ${cartCount()}`); // reruns whenever cartCount changes
});

cartCount.set(5);              // set a new value
cartCount.update(v => v + 1);  // update based on the previous value
```

### Code Explanation
- `signal(0)` — creates a signal with initial value `0`. Read it by *calling* it: `cartCount()`.
- `computed(...)` — derives a new signal from others; recalculates automatically and lazily, only when read after a dependency changes.
- `effect(...)` — runs a side effect automatically whenever any signal it reads changes.

### E-commerce Example
`CartService` could expose `cartCount` as a signal, and the navbar's cart icon reads `cartCount()` directly in its template — updating instantly whenever items are added or removed, with no manual subscription.

### Common Mistakes
- Forgetting to call the signal as a function (`cartCount` instead of `cartCount()`) — this reads the signal object itself, not its value.
- Mixing signals and Observables without a clear reason — pick the right tool per use case.

### Key Points
| | Signals | Observables |
|---|---|---|
| Sync/Async | Synchronous values | Can be async streams |
| Subscription | No manual subscribe/unsubscribe | Requires subscribe/unsubscribe |
| Use case | Component state, UI reactivity | HTTP, events, complex async pipelines |

---

## 21. Angular Application Architecture

### What is it?
The overall pattern of how components, services, HTTP, routing, and guards fit together in a real application.

### Why do we use it?
Understanding the flow end-to-end helps you decide where new code belongs (component vs. service vs. interceptor vs. guard).

### How does it work?

**Data flow:**
```
ProductsComponent
      ↓
ProductService
      ↓
HttpClient
      ↓
API
      ↓
Database
```
The component asks a service for data; the service calls the backend via `HttpClient`; the response flows back up as an Observable (or Signal, if converted) that the component subscribes to or binds to the template.

**Navigation & protection flow:**
```
User
 ↓
Component
 ↓
Router
 ↓
Guard
 ↓
Protected Component
```
The user triggers navigation (clicking a link or a `router.navigate()` call); the Router matches the route; any `canActivate` Guard runs first; only if it returns `true` does the Router render the protected destination component.

**Reactive state flow:**
```
Component
 ↓
Service
 ↓
Observable / Signal
 ↓
UI
```
Services expose state as Observables/Signals; components consume them (ideally via the `async` pipe or by reading signals in the template) so the UI updates reactively without manual subscription management.

### E-commerce Example
Adding a product to the cart: `ProductCardComponent` emits an event → `ProductListComponent` calls `CartService.addItem()` → `CartService` updates its internal `BehaviorSubject`/signal → the navbar's `CartIconComponent`, subscribed via the `async` pipe (or reading the signal), updates its displayed count automatically.

### Key Points
- Components: presentation only.
- Services: data, state, business logic.
- Router + Guards: navigation and access control.
- HttpClient + Interceptors: backend communication.

---

## 22. Angular Best Practices

### What is it?
A set of conventions that keep an Angular codebase maintainable, performant, and easy for a team to work on.

### Why do we use it?
Following consistent conventions avoids "spaghetti code" and makes it easier for you (or teammates) to work on the project months later.

### Key Points
- **Single Responsibility:** components handle UI/presentation only; services handle data/business logic.
- **Separation of concerns:** don't put HTTP calls inside components — put them in services.
- **Reusable components:** small, focused, configurable via `@Input`/`@Output` (e.g., a `ProductCardComponent` used across multiple pages).
- **Naming conventions:** `kebab-case` for selectors (`app-product-card`), `PascalCase` for classes, files named `feature.type.ts` (e.g., `product.service.ts`).
- **Folder structure:** group by feature (`products/`, `cart/`, `checkout/`) rather than by type, for anything beyond a very small app.
- **Avoid duplicated code:** extract shared logic into services, pipes, or utility functions.
- **Error handling:** always handle HTTP errors (`catchError`), never let unhandled failures silently break the UI.
- **Security:** never trust client-side-only checks (guards, disabled buttons) — the backend must always independently validate/authorize.
- **Performance:** use `OnPush` + immutable data, `track` in `@for`, lazy-load feature routes, avoid memory leaks by unsubscribing.
- **Clean code:** small functions, descriptive names, avoid deeply nested logic in templates.

---

## Angular Vocabulary

| Term | Meaning |
|---|---|
| **Component** | A self-contained UI building block combining a class, template, and styles. |
| **Service** | A reusable class holding shared logic/data, injected wherever needed. |
| **Directive** | An instruction attached to a DOM element that changes its appearance or behavior. |
| **Pipe** | A function used in templates to transform displayed data. |
| **Observable** | A stream of values over time that code can subscribe to (from RxJS). |
| **Signal** | A reactive value container that automatically tracks dependencies and notifies on change. |
| **Router** | Angular's system for mapping URLs to components. |
| **Guard** | A function that controls whether navigation to/from a route is allowed. |
| **Interceptor** | A function that intercepts outgoing HTTP requests/incoming responses globally. |
| **Dependency Injection (DI)** | The pattern where a class receives its dependencies from an external system rather than creating them itself. |
| **API** | Application Programming Interface — how the frontend communicates with the backend. |
| **HTTP** | HyperText Transfer Protocol — the protocol used for client-server communication. |
| **RxJS** | Reactive Extensions for JavaScript — the library providing Observables and operators. |
| **Standalone Component** | A component that declares its own imports directly, without an `NgModule`. |
| **Lifecycle Hook** | A method Angular calls automatically at a specific point in a component's life. |
| **Change Detection** | The mechanism Angular uses to detect data changes and update the DOM. |

---

## Common Errors & Solutions

**Error**
```text
NG0303: Can't bind to 'ngModel' since it isn't a known property of 'input'
```
**Why it happens**
`FormsModule` was not imported into the standalone component using `[(ngModel)]`.
**How to fix it**
Add `FormsModule` to the component's `imports` array.

---

**Error**
```text
NG0994: NgIf and NgFor were used together on the same element
```
**Why it happens**
Legacy structural directives `*ngIf` and `*ngFor` were placed on the same DOM element.
**How to fix it**
Split them using an `<ng-container>`, or switch to the modern `@if`/`@for` control-flow syntax, which doesn't have this restriction.

---

**Error**
```text
@for loop requires a "track" expression
```
**Why it happens**
The modern `@for` structural directive was used without a required `track` expression.
**How to fix it**
Add `track` referencing a stable unique property, e.g. `@for (item of items; track item.id)`.

---

**Error**
```text
NullInjectorError: No provider for ProductService!
```
**Why it happens**
The service is missing `@Injectable({ providedIn: 'root' })`, or was not added to any relevant `providers` array.
**How to fix it**
Add `@Injectable({ providedIn: 'root' })` to the service class (the standard fix for most app-wide services).

---

**Error**
```text
Nothing happens after calling an HTTP method (no data, no error)
```
**Why it happens**
`HttpClient` methods return Observables, which are lazy — the request never fires without `.subscribe()`.
**How to fix it**
Call `.subscribe()` on the returned Observable, or bind it to the template with the `async` pipe.

---

**Error**
```text
Memory usage grows over time / duplicate console logs after repeated navigation
```
**Why it happens**
A manual `.subscribe()` call (often to a `Subject`/`BehaviorSubject` or a long-lived stream) was never unsubscribed in `ngOnDestroy`.
**How to fix it**
Unsubscribe in `ngOnDestroy`, or prefer the `async` pipe / `takeUntilDestroyed()`, which handle this automatically.

---

## Angular Fundamentals Checklist

- [ ] Components
- [ ] Templates
- [ ] Data Binding
- [ ] Directives
- [ ] Pipes
- [ ] Component Communication (@Input / @Output)
- [ ] Services
- [ ] Dependency Injection
- [ ] Lifecycle Hooks
- [ ] Forms
- [ ] Routing
- [ ] Guards
- [ ] HTTP / APIs
- [ ] Observables / RxJS
- [ ] Authentication
- [ ] Interceptors
- [ ] Standalone Components
- [ ] Change Detection
- [ ] Signals
- [ ] Angular Architecture
- [ ] Best Practices

### 🟢 Must Understand (core, before anything else)
- Components, templates, data binding (interpolation, property, event, two-way)
- `*ngIf`/`*ngFor` and modern `@if`/`@for`/`@switch`
- `@Input`/`@Output`
- Services + Dependency Injection basics
- `ngOnInit`/`ngOnDestroy`
- Basic Reactive Forms (`FormGroup`, `FormControl`, validators)
- Routing basics (`RouterOutlet`, `routerLink`, route params)
- `HttpClient` GET/POST + Observable `.subscribe()`
- TypeScript basics: types, interfaces, classes

### 🟡 Should Understand (intermediate, needed for real apps)
- Pipes (built-in + custom, pure vs impure)
- All lifecycle hooks
- Guards
- RxJS operators (`map`, `switchMap`, `catchError`, `debounceTime`)
- `BehaviorSubject` and shared state via services
- Async pipe
- HTTP Interceptors
- Authentication flow (JWT, AuthService)
- Standalone components & `app.config.ts`

### 🔵 Good to Know (advanced/professional polish)
- Change detection internals, Zone.js, `OnPush`
- Signals (`signal`, `computed`, `effect`) and how they relate to Observables
- Hierarchical DI / component-level providers
- `FormArray` and dynamic forms
- Performance optimization techniques
- Testing (unit tests with Jasmine/Karma or Jest)

---

## Fundamentals Assessment Test

**A. Multiple Choice**
1. Which binding syntax sends data from the template *to* the component class?
   a) `{{ }}`  b) `[property]`  c) `(event)`  d) `[(ngModel)]`
2. What does `providedIn: 'root'` do?
   a) Limits the service to one component  b) Creates a singleton available app-wide  c) Disables the service  d) Nothing, it's optional decoration
3. Which lifecycle hook is best for fetching initial data?
   a) constructor  b) ngOnChanges  c) ngOnInit  d) ngAfterViewInit
4. What's the key difference between a Promise and an Observable?
   a) Promises are faster  b) Observables can emit multiple values over time and are cancellable  c) They're identical  d) Promises use RxJS

**B. Code Reading**
```typescript
@Component({ selector: 'app-x', standalone: true, template: `<p>{{ getTotal() }}</p>` })
export class X {
  getTotal() { console.log('called'); return 100; }
}
```
Question: Why is calling `getTotal()` directly in the template considered a bad practice here? What would you use instead?

**C. "What happens if...?"**
1. What happens if you forget to add `track` inside a modern `@for` loop?
2. What happens if you forget to `.subscribe()` to an HTTP call?
3. What happens if a component using `OnPush` mutates an array in place (`arr.push(x)`) instead of creating a new array?

**D. Practical Coding**
Write a standalone Angular component `CartCounterComponent` that:
- Displays a count starting at 0
- Has "Add Item" and "Remove Item" buttons
- Emits an `@Output() countChanged` event with the new value every time it changes

**E. Debugging**
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  items = [];
  addItem(item: any) { this.items.push(item); }
}

@Component({ providers: [CartService], ... }) // <-- bug is here
export class CartPageComponent { ... }
```
Question: This app has multiple components expecting to share one cart, but items added in one component don't show up in another. What's wrong, and how do you fix it?

---

*This README is a living reference — update it as the E-commerce project grows and as new Angular concepts are learned in depth.*
