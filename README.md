# Angular Fundamentals

> مرجع شامل لأساسيات Angular، مُنظَّم لاستخدامه أثناء بناء مشروع Angular E-commerce الأول.
> هذا الملف مرجعي — راجعه بعد كل موضوع تتعلمه، ولا تحاول قراءته دفعة واحدة.

---

## Table of Contents

1. [Angular & TypeScript Basics](#1-angular--typescript-basics)
2. [Angular Project Structure](#2-angular-project-structure)
3. [Components](#3-components)
4. [Templates & Data Binding](#4-templates--data-binding)
5. [Directives](#5-directives)
6. [Pipes](#6-pipes)
7. [Data & Component Communication (@Input / @Output)](#7-data--component-communication-input--output)
8. [Services & Dependency Injection](#8-services--dependency-injection)
9. [Lifecycle Hooks](#9-lifecycle-hooks)
10. [Forms](#10-forms)
11. [Routing](#11-routing)
12. [Guards](#12-guards)
13. [HTTP & APIs](#13-http--apis)
14. [Observables & RxJS](#14-observables--rxjs)
15. [Authentication](#15-authentication)
16. [HTTP Interceptors](#16-http-interceptors)
17. [Standalone Components](#17-standalone-components)
18. [Change Detection](#18-change-detection)
19. [Signals](#19-signals-modern-angular-reactivity)
20. [Angular Application Architecture](#20-angular-application-architecture)
21. [Best Practices](#21-best-practices)
22. [Angular Fundamentals Checklist](#angular-fundamentals-checklist)
23. [Fundamentals Assessment Test](#fundamentals-assessment-test)

---

## 1. Angular & TypeScript Basics

### Angular

**ما هو؟**
Angular هو framework متكامل (من Google) لبناء تطبيقات Single Page Applications (SPAs) باستخدام TypeScript وComponents وبنية معمارية صارمة (strict architecture).

**ليه نستخدمه؟**
بناء تطبيقات كبيرة وتفاعلية بـ JavaScript عادي بيصبح معقّد بسرعة (لا يوجد structure، لا يوجد types، تحديث الـ DOM يدويًا). Angular بيوفّر routing وforms وHTTP وDI وأدوات اختبار جاهزة، مع قواعد إلزامية — وده مهم جدًا للفرق والمشاريع طويلة العمر.

**إزاي بيشتغل؟**
Angular بيحوّل الـ TypeScript والـ templates بتاعتك لـ JavaScript. وبيراقب البيانات (data) بتاعتك ويحدّث الـ DOM تلقائيًا لما البيانات تتغير (change detection).

**نقطة مهمة:**
Angular ≠ AngularJS. AngularJS (2010) هو الإصدار القديم 1.x، وAngular (2016+) هو إعادة كتابة كاملة. لما الناس يقولوا "Angular" دلوقتي، بيقصدوا v2+.

### Angular vs JavaScript

**ما هو؟**
JavaScript هي اللغة، وAngular هو framework مبني بـ (ومن أجل) JavaScript (عن طريق TypeScript) وبيضيف structure فوقها.

**ليه نستخدمه؟**
الـ JavaScript العادي مبيدّيش أي رأي (opinions) في تنظيم تطبيق كبير — هتضطر تبني الـ routing وstate management وcomponent system بنفسك. Angular بيوفّر كل ده جاهز.

### Angular vs TypeScript

**ما هو؟**
TypeScript هي superset من JavaScript بتضيف static types وinterfaces وفحص أخطاء وقت الـ compile. Angular مكتوب بـ TypeScript وبيتطلبها.

**ليه نستخدمه؟**
TypeScript بتمسك الأخطاء قبل ما تشغّل الكود (زي تمرير string في مكان متوقّع فيه number)، وبتخلّي المشاريع الكبيرة أسهل بكتير في الصيانة (maintain) وإعادة الهيكلة (refactor).

**مثال (Example):**
```typescript
let age: number = 25;
age = "twenty five"; // ❌ Compile-time error — متمسوك قبل التشغيل
```

### TypeScript Types

**ما هو؟**
labels بتقول لـ TypeScript نوع القيمة اللي المتغير بيحملها: `string`, `number`, `boolean`, `any`, arrays (`string[]`), objects, union types (`string | number`)، إلخ.

**مثال:**
```typescript
let username: string = "Ali";
let age: number = 30;
let isActive: boolean = true;
let scores: number[] = [90, 85, 70];
let id: string | number = 101; // union type
```

**خطأ شائع (Common mistake):**
الإفراط في استخدام `any` بيلغي الفايدة من TypeScript كلها — هتفقد كل الـ type safety. تجنّبه إلا لو محتاجه فعلًا.

### Interface

**ما هو؟**
عقد (contract) بيوصف *شكل* الـ object — الـ properties/methods اللي لازم يكون عنده — من غير أي تنفيذ فعلي.

**ليه نستخدمه؟**
بيضمن الاتساق (consistency): أي object بيدّعي إنه `User` لازم يكون فيه الحقول المحدّدة. مفيد جدًا لتحديد نوع API responses، Component Inputs، إلخ. في مشروع E-commerce، هتستخدمه مثلًا عشان تحدّد شكل الـ `Product`.

**مثال:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string; // optional property
}

const product: Product = { id: 1, name: "T-Shirt", price: 25 };
```

**نقطة مهمة:**
الـ Interfaces موجودة بس وقت الـ compile — بتختفي في الـ JavaScript الناتج. تكلفتها صفر وقت الـ runtime.

### Class

**ما هو؟**
مخطط (blueprint) لإنشاء objects، بيجمع بيانات (properties) وسلوك (methods) مع بعض.

**مثال:**
```typescript
class Product {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  describe(): string {
    return `Product: ${this.name}`;
  }
}
const p = new Product("Laptop");
console.log(p.describe()); // "Product: Laptop"
```

**ليه نستخدمه؟**
Components، Services، Directives في Angular — كلها عبارة عن TypeScript classes مربوط بيها decorators خاصة.

### Constructor

**ما هو؟**
method خاصة بتتشغّل تلقائيًا لما instance من الـ class يتعمل (`new ClassName()`). بتُستخدم لتهيئة (initialize) الـ properties، وفي Angular بتُستخدم أساسًا لـ **dependency injection**.

**مثال:**
```typescript
class Cart {
  constructor(public items: string[] = []) {} // shorthand: بيعرّف ويعيّن `items`
}
```

**نقطة مهمة:**
في Angular، الـ constructor أساسًا للـ dependency injection — مش لمنطق ثقيل (heavy logic). أي تهيئة ثقيلة بتتحط في `ngOnInit` (هنشرحه في Lifecycle Hooks).

### Properties & Methods

**ما هو؟**
Properties = البيانات المخزّنة في الـ class (متغيرات). Methods = الدوال المعرّفة في الـ class (السلوك/behavior).

### Access Modifiers

**ما هو؟**
كلمات مفتاحية بتتحكّم في ظهور أعضاء الـ class: `public` (افتراضي، متاح في كل مكان)، `private` (بس جوه الـ class)، `protected` (الـ class + subclasses).

**ليه نستخدمه؟**
Encapsulation — إخفاء التفاصيل الداخلية، وإظهار اللي محتاجينه بس. بيمنع أي كود تاني يعبث في الـ state الداخلي مباشرة.

**مثال:**
```typescript
class ShoppingCart {
  private total: number = 0;
  addToTotal(amount: number) { this.total += amount; }
  getTotal(): number { return this.total; }
}
```

### Decorators

**ما هو؟**
دوال خاصة بتبدأ بـ `@` وبتحطّ metadata على class أو property أو method، وبتقول لـ Angular يتعامل معاها إزاي (زي `@Component`, `@Injectable`, `@Input`).

**ليه نستخدمه؟**
Angular محتاج يعرف "الـ class ده component"، "الـ class ده service"، إلخ. الـ decorators هي الطريقة اللي بنقوله بيها كده.

**مثال:**
```typescript
@Component({
  selector: 'app-product-card',
  template: `<h1>{{ productName }}</h1>`
})
export class ProductCardComponent {
  productName = 'Wireless Headphones';
}
```

**نقطة مهمة:**
الـ decorators مبتغيّرش منطق الـ class بتاعك — هي بس بتحطّ إعدادات (configuration) Angular بيقراها وقت الـ compile/runtime.

---

## 2. Angular Project Structure

### Angular CLI

**ما هو؟**
أداة سطر أوامر (command-line tool) اسمها `ng` لإنشاء وبناء واختبار وتوليد كود Angular.

**ليه نستخدمه؟**
بيؤتمت (automate) الكود المتكرر (زي عمل component، service، إلخ) وبيفرض structure ونظام تسمية (naming) ثابت.

**أوامر أساسية (Key commands):**
```bash
ng new ecommerce-app       # إنشاء مشروع جديد
ng serve                   # تشغيل dev server (localhost:4200)
ng generate component product-card  # عمل component (اختصار: ng g c product-card)
ng build                   # production build
```

### Project Structure

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

| الملف/المجلد | الوظيفة |
|---|---|
| `src/` | كل الكود المصدري (source code) بتاعك هنا |
| `app/` | كود التطبيق الرئيسي — components وservices وroutes |
| `assets/` | ملفات ثابتة: صور، خطوط، JSON data |
| `main.ts` | نقطة الدخول (entry point) — بيشغّل (bootstrap) التطبيق في المتصفح |
| `app.config.ts` | إعدادات عامة للتطبيق (providers: router، HTTP client، إلخ) — مستخدمة مع standalone components |
| `app.routes.ts` | تعريف الـ routes (ربط URL بـ component) |
| `angular.json` | إعدادات الـ build/CLI |
| `package.json` | npm dependencies والـ scripts |
| `tsconfig.json` | إعدادات TypeScript compiler |

> ⚠️ **خطأ شائع:** تعديل `angular.json` أو `tsconfig.json` من غير فهم اللي بتعدّله ممكن يكسر الـ build بصمت. عدّل إعداد واحد في كل مرة، وبحذر.

---

## 3. Components

**ما هو؟**
الـ Component بيتحكّم في جزء من الـ UI: بيجمع TypeScript class (منطق/بيانات)، وHTML template (العرض/view)، وCSS (التنسيق). تطبيقات Angular عبارة عن شجرة (tree) من components متداخلة.

**ليه نستخدمه؟**
بيشجّع على قطع UI قابلة لإعادة الاستخدام (reusable) وقابلة للاختبار ومنفصلة عن بعض، بدل صفحة واحدة كبيرة متشابكة.

**إزاي بيشتغل؟**
Angular بيقرا الـ metadata بتاعة الـ `@Component` decorator، وبيرندر الـ template، وبيربطه بـ instance الـ class، وبيدير lifecycle بتاعه.

**مثال — مثلًا بطاقة منتج في متجرك (Product Card):**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',   // custom HTML tag: <app-product-card></app-product-card>
  standalone: true,               // Angular الحديث: مش محتاج NgModule
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

**شرح الكود (Code Explanation):**
- `@Component({...})` — decorator بيحدّد إن الـ class ده component وبيعمل configuration ليه.
- `selector` — اسم الـ tag المخصص المستخدم لوضع الـ component ده في template الأب (parent).
- `standalone: true` — الـ component ده بيدير الـ imports بتاعته بنفسه (من غير NgModule)؛ ده الافتراضي الحديث من Angular 14+/17+.
- `template` — HTML مضمّن (inline) (البديل: `templateUrl: './product-card.component.html'`).
- `styles` — CSS مضمّن ومحصور (scoped) على الـ component ده بس (البديل: `styleUrl`).
- `export class ProductCardComponent` — حاوية المنطق الفعلية؛ `name` و`price` هما `@Input()` بيتم تمريرهم من الأب.

**Component Communication →** الأب والابن (Parent/Child) بيتواصلوا عن طريق `@Input()` (أب → ابن) و`@Output()` (ابن → أب). هنشرحها بالتفصيل في القسم 7.

**أخطاء شائعة (Common mistakes):**
- وضع منطق العمل (business logic) — زي API calls أو حسابات ثقيلة — مباشرة جوه الـ components بدل الـ services، ده بيصعّب اختبار وإعادة استخدام الـ component.
- نسيان `standalone: true` والـ `imports` array المطلوبة لما تستخدم directives/pipes في الـ template (زي `*ngFor`، `DatePipe`) في standalone components.

---

## 4. Templates & Data Binding

**ما هو؟**
الـ HTML مع syntax خاص بـ Angular بيربط بين class الـ component وبين اللي ظاهر على الشاشة.

| Syntax | الاسم | الاتجاه | مثال |
|---|---|---|---|
| `{{ value }}` | Interpolation | Component → View | `<p>{{ productName }}</p>` |
| `[property]="value"` | Property Binding | Component → View | `<img [src]="productImage">` |
| `(event)="handler()"` | Event Binding | View → Component | `<button (click)="addToCart()">Add</button>` |
| `[(ngModel)]="value"` | Two-Way Binding | الاتجاهين | `<input [(ngModel)]="searchTerm">` |

**ليه نستخدمه؟**
دي الطريقة اللي Angular بيخلّي بيها الـ UI متزامن (in sync) مع البيانات تلقائيًا، بدل ما تنادي `document.getElementById()` يدويًا وتحدّث الـ DOM بنفسك.

**مثال — Search box في صفحة المنتجات:**
```html
<input [(ngModel)]="searchTerm" placeholder="Search products...">
<p>Searching for: {{ searchTerm }}</p>
<button (click)="clearSearch()">Clear</button>
```
```typescript
export class ProductsComponent {
  searchTerm = '';
  clearSearch() { this.searchTerm = ''; }
}
```

**شرح الكود:**
- `[(ngModel)]="searchTerm"` — syntax اسمها "banana in a box"؛ بتجمع بين property binding `[ngModel]` وevent binding `(ngModelChange)`. لما تكتب في الـ input، القيمة `searchTerm` بتتحدّث، ولما `searchTerm` تتغيّر في الكود، الـ input بيتحدّث.
- `{{ searchTerm }}` — الـ interpolation بتقرا القيمة الحالية وتعرضها، وبتترندر تلقائيًا لما القيمة تتغير.
- `(click)="clearSearch()"` — بينادي method الـ `clearSearch()` لما الزرار يتضغط.

**Bindings تانية:**
- **Attribute binding:** `[attr.aria-label]="label"` — للـ HTML attributes اللي مالهاش property مطابقة في الـ DOM.
- **Class binding:** `[class.out-of-stock]="!product.inStock"` — بيفعّل/يلغي CSS class بشكل شرطي.
- **Style binding:** `[style.color]="isDiscounted ? 'red' : 'black'"`.
- **Template reference variables:** `<input #searchBox>` بعدين `{{ searchBox.value }}` — بتسمحلك تشير للـ DOM element مباشرة في الـ template.

**أخطاء شائعة:**
- نسيان استيراد `FormsModule` لما تستخدم `ngModel` في standalone components → runtime error.
- الخلط بين `{{ }}` (interpolation، بتقرا القيم بس) وبين `[ ]` (property binding، ممكن تربط أي property مش نص بس).

---

## 5. Directives

**ما هو؟**
تعليمات (instructions) بتتحط على عناصر الـ DOM وبتغيّر شكلها أو سلوكها.

**الأنواع (Types):**
- **Attribute directives** — بتغيّر شكل/سلوك عنصر موجود (`ngClass`, `ngStyle`).
- **Structural directives** — بتغيّر شكل الـ DOM بإضافة/إزالة عناصر (`*ngIf`, `*ngFor`، أو الحديث `@if`/`@for`).

**Modern Angular control flow (v17+) — الأفضل حاليًا بدل `*ngIf`/`*ngFor`:**
```html
@if (isLoggedIn) {
  <p>مرحبًا بعودتك!</p>
} @else {
  <p>من فضلك سجّل الدخول.</p>
}

@for (product of products; track product.id) {
  <li>{{ product.name }} — {{ product.price | currency }}</li>
} @empty {
  <li>لا توجد منتجات.</li>
}

@switch (orderStatus) {
  @case ('pending') { <p>الطلب قيد الانتظار</p> }
  @case ('shipped') { <p>تم الشحن</p> }
  @default { <p>غير معروف</p> }
}
```

**الـ syntax القديم (legacy، مستخدم كتير في مشاريع موجودة، لازم تعرف الاتنين):**
```html
<p *ngIf="isLoggedIn">مرحبًا بعودتك!</p>
<li *ngFor="let product of products">{{ product.name }}</li>
<div [ngClass]="{ 'out-of-stock': !product.inStock, 'on-sale': product.discount > 0 }"></div>
<div [ngStyle]="{ color: product.discount > 0 ? 'red' : 'green' }"></div>
```

**ليه نستخدمه؟**
بيخليك تظهر/تخفي عناصر بشكل شرطي وتعمل loop على البيانات بشكل declarative، من غير تلاعب يدوي في الـ DOM.

**شرح الكود (@for):**
- `track product.id` **إلزامي** في الـ syntax الجديد — بيقول لـ Angular إزاي يميّز كل عنصر بشكل فريد عشان يقدر يحدّث القائمة بكفاءة بدل ما يعيد رندر كل حاجة.

**مثال Custom Directive:**
```typescript
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
الاستخدام: `<p appHighlightOffer>عرض خاص!</p>`

**أخطاء شائعة:**
- نسيان `track` في `@for` (compile error في Angular الحديث).
- استخدام `*ngIf` و`*ngFor` على *نفس* العنصر في الـ syntax القديم — غير مسموح مباشرة؛ كان لازم `<ng-container>`. (القيد ده كان سبب من أسباب وجود الـ syntax الجديد `@if`/`@for`، واللي معندوش المشكلة دي.)

---

## 6. Pipes

**ما هو؟**
دوال بسيطة بتُستخدم في الـ templates لتحويل شكل البيانات المعروضة من غير ما تغيّر القيمة الأصلية.

**ليه نستخدمه؟**
تنسيق البيانات (dates، currency، case) احتياج شائع جدًا — الـ pipes بتخلّي المنطق ده بعيد عن class الـ component وقابل لإعادة الاستخدام.

**Built-in pipes — مثال في صفحة منتج:**
```html
{{ product.price | currency:'USD' }}      <!-- $49.99 -->
{{ order.date | date:'shortDate' }}       <!-- 9/21/26 -->
{{ product.name | uppercase }}            <!-- WIRELESS HEADPHONES -->
{{ category | lowercase }}                <!-- electronics -->
{{ product | json }}                      <!-- object منسّق بشكل جميل، مفيد للـ debugging -->
```
**سلسلة Pipes (Chaining):** `{{ productName | lowercase | titlecase }}`

**Custom Pipe:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
```
الاستخدام: `{{ product.description | truncate:50 }}`

**Pure vs Impure Pipes:**
- **Pure** (الافتراضي): بيشتغل بس لما الـ *reference* بتاعة الـ input تتغيّر. سريع وفعّال.
- **Impure** (`pure: false`): بيشتغل في كل change detection cycle، حتى لو الـ reference متغيرتش (محتاجه في حالات زي فلترة array بيتعدّل في مكانه). أغلى بكتير — استخدمه بحذر.

**خطأ شائع →** كتابة impure pipe لقائمة حساسة للأداء (performance-sensitive list) بيسبب بطء كبير. الأفضل تحديث البيانات بشكل immutable عشان الـ pure pipes تشتغل صح.

---

## 7. Data & Component Communication (@Input / @Output)

**ما هو؟**
`@Input()` بيخلّي الأب (parent) يمرر بيانات لتحت للابن (child component). `@Output()` (مع `EventEmitter`) بيخلّي الابن يبعت أحداث/بيانات لفوق للأب.

**مثال — بطاقة منتج بتبعت حدث "أضف للسلة" للأب:**
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

**شرح الكود:**
- `@Input() productName` — بيعرّف `productName` كـ property الأب يقدر يعيّنها عن طريق `[productName]="..."`.
- `@Output() addedToCart = new EventEmitter<string>()` — بيعرّف حدث الابن يقدر يبعته؛ `<string>` بيحدّد نوع الـ payload المرسل.
- `this.addedToCart.emit(...)` — بيطلق الحدث، وده بيشغّل الـ handler بتاع الأب `(addedToCart)="onAddToCart($event)"`.
- `$event` في template الأب بيحمل أي قيمة اتبعتت لـ `.emit()`.

**نستخدمه إمتى؟ →** للعلاقة المباشرة بين أب وابن. لمشاركة بيانات بين components *مش مرتبطة* ببعض، استخدم **Service** بدل كده (القسم 8).

**أخطاء شائعة:**
- محاولة استخدام `@Output` للتواصل بين components شقيقة (siblings) مباشرة — ده مش بيشتغل؛ لازم تعدّي عن طريق service مشترك أو الأب.
- نسيان تحديد النوع `<string>` على الـ `EventEmitter` — بتفقد type safety على القيمة المُرسلة.

---

## 8. Services & Dependency Injection

### Services

**ما هو؟**
class عادي في TypeScript بيحمل منطق وبيانات قابلة لإعادة الاستخدام (زي API calls، shared state) — منفصل عن أي component معيّن.

**ليه نستخدمه؟**
بيخلّي الـ components خفيفة (تركّز على الـ UI بس) وبيخلّي أكتر من component يشارك نفس البيانات/المنطق من غير تكرار الكود.

**مثال — Service لجلب وإدارة المنتجات:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('https://api.myshop.com/products');
  }
}
```

**شرح الكود:**
- `@Injectable({ providedIn: 'root' })` — بيحدّد إن الـ class ده injectable وبيسجّله كـ **singleton** على مستوى التطبيق كله (root) — instance واحد مشترك في التطبيق بالكامل.

### Dependency Injection (DI)

**ما هو؟**
design pattern فيها الـ class *بياخد* الـ objects اللي محتاجها (زي services) من نظام خارجي، بدل ما يعملها بنفسه.

**ليه نستخدمه؟**
بيفصل الـ classes عن تفاصيل تنفيذ الـ dependencies بتاعتها، وده بيسهّل الاختبار (تقدر تحقن fake/mock service) والصيانة.

**إزاي بيشتغل؟**
Angular عنده DI container مدمج. لما الـ component يطلب service (عن طريق constructor أو `inject()`)، Angular بيدوّر عليه (أو يعمله) ويديهوله.

**مثال — استخدام الـ Service جوه component:**
```typescript
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({ selector: 'app-product-list', standalone: true, template: `...` })
export class ProductListComponent {
  private productService = inject(ProductService); // الطريقة الحديثة
  // أو: constructor(private productService: ProductService) {} // الطريقة الكلاسيكية

  products$ = this.productService.getProducts();
}
```

**مصطلحات مهمة (Important terms):**
- **Provider** — بيقول لـ Angular *إزاي* يعمل الـ dependency (غالبًا الـ class نفسه مع `providedIn`).
- **Token** — المُعرِّف (identifier) اللي الـ DI بيستخدمه للبحث عن dependency (غالبًا نوع الـ class نفسه).
- **Hierarchical injection** — الـ services ممكن تتوفّر على مستوى root (singleton على مستوى التطبيق)، أو على مستوى component معيّن (`providers: [...]` في `@Component`) — وده بيعمل *instance جديد* محصور على الـ component ده وأولاده بس.

**أخطاء شائعة:**
- توفير service في `providers` array بتاع component وانت كنت عايز instance واحد مشترك على مستوى التطبيق — ده بيعمل عدة instances منفصلة بدل واحد singleton.
- وضع منطق API/business logic جوه components بدل services.

---

## 9. Lifecycle Hooks

**ما هو؟**
methods خاصة Angular بينادي عليها تلقائيًا في نقاط محدّدة من حياة الـ component (الإنشاء، التحديثات، التدمير).

| الـ Hook | بيشتغل إمتى | الاستخدام الشائع |
|---|---|---|
| `ngOnChanges` | قبل `ngOnInit`، وكل ما قيمة `@Input()` تتغيّر | التفاعل مع تغييرات الـ inputs |
| `ngOnInit` | مرة واحدة، بعد ما inputs الـ component تتحدّد | جلب البيانات الأولية/الإعداد |
| `ngDoCheck` | في كل change detection run | منطق change detection مخصّص (نادرًا محتاجينه) |
| `ngAfterContentInit` | مرة واحدة، بعد تهيئة المحتوى المُسقط عبر `<ng-content>` | التعامل مع المحتوى المُسقط |
| `ngAfterContentChecked` | بعد كل فحص للمحتوى المُسقط | — |
| `ngAfterViewInit` | مرة واحدة، بعد تهيئة view الـ component (وأولاده) | الوصول لعناصر `@ViewChild` |
| `ngAfterViewChecked` | بعد كل فحص لـ view الـ component | — |
| `ngOnDestroy` | قبل ما الـ component يتشال مباشرة | التنظيف (cleanup): unsubscribe، مسح الـ timers |

**مثال — جلب تفاصيل منتج عند فتح الصفحة، والتنظيف عند مغادرتها:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

export class ProductDetailComponent implements OnInit, OnDestroy {
  private subscription: any;

  ngOnInit() {
    this.subscription = this.productService.getProduct(this.id).subscribe(/* ... */);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe(); // منع تسريب الذاكرة (memory leaks)
  }
}
```

**أخطاء شائعة:**
- عمل API calls / إعداد ثقيل جوه الـ constructor بدل `ngOnInit` — الـ inputs مش مضمون تكون جاهزة في الـ constructor.
- نسيان تنظيف `ngOnDestroy` (إلغاء الاشتراك من Observables، مسح intervals) — بيسبب memory leaks.
- الوصول لعناصر `@ViewChild` في `ngOnInit` بدل `ngAfterViewInit` — لسه مش متاحة في الوقت ده.

---

## 10. Forms

### Template-driven Forms

**ما هو؟**
Forms بتتبني أساسًا في الـ HTML template، باستخدام `ngModel` وdirectives؛ Angular بيعمل الـ form model من وراء الكواليس.
```html
<form #checkoutForm="ngForm" (ngSubmit)="onSubmit(checkoutForm)">
  <input name="email" [(ngModel)]="email" required email>
  <button [disabled]="checkoutForm.invalid">Submit</button>
</form>
```
**نستخدمه إمتى؟ →** Forms بسيطة مع validation خفيف.

### Reactive Forms

**ما هو؟**
Forms بتتحدّد وتتحكّم من جوه الـ TypeScript class باستخدام `FormControl` و`FormGroup` و`FormBuilder` — أوضح وأسهل في الاختبار وأكتر قابلية للتوسّع (scalable).

**مثال — Checkout Form في متجرك:**
```typescript
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
```
```html
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
  <input formControlName="email">
  @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
    <p>البريد الإلكتروني غير صحيح</p>
  }
  <button [disabled]="checkoutForm.invalid">إتمام الطلب</button>
</form>
```

**شرح الكود:**
- `FormBuilder.group({...})` — بيبني `FormGroup` (مجموعة controls) من إعداد مختصر.
- `[initialValue, [validators]]` — كل حقل بيتم ربطه بـ `FormControl` بقيمة بداية وقواعد validation.
- `formGroup` / `formControlName` — بتربط الـ template inputs بالـ reactive form model.
- `.touched`, `.dirty`, `.valid`, `.invalid` — أعلام حالة (state flags) الكنترول: *touched* = المستخدم عمل focus وبعدين طلع منه؛ *dirty* = القيمة اتغيّرت؛ *valid/invalid* = عدّت/فشلت في الـ validators.
- `FormArray` — قائمة ديناميكية من controls/groups (زي إضافة أكتر من عنوان شحن).

**مثال Custom Validator:**
```typescript
function noSpacesValidator(control: AbstractControl) {
  return control.value?.includes(' ') ? { hasSpaces: true } : null;
}
```

**نستخدم إيه إمتى؟ →** Template-driven: forms سريعة وبسيطة. Reactive: forms معقّدة، حقول ديناميكية، unit testing، تطبيقات كبيرة — المعيار الاحترافي.

**أخطاء شائعة:**
- نسيان imports بتاعة `ReactiveFormsModule`/`FormsModule` في standalone components.
- عدم التحقق من `.touched` قبل إظهار رسائل الخطأ — بيظهر الأخطاء قبل ما المستخدم يتفاعل أصلًا مع الحقل.

---

## 11. Routing

**ما هو؟**
Angular Router بيربط الـ URLs بالـ components، وده بيسمح بالتنقل من غير إعادة تحميل الصفحة بالكامل.

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent }, // route parameter
  { path: 'cart', component: CartComponent,
    children: [ { path: 'checkout', component: CheckoutComponent } ] }, // nested route
  { path: '**', component: NotFoundComponent } // wildcard — لازم يكون آخر واحد
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

**شرح الكود:**
- `RouterOutlet` — المكان اللي الـ component المطابق بيترندر فيه.
- `routerLink` — تنقل declarative (بيتفادى إعادة تحميل الصفحة).
- `routerLinkActive` — بيضيف CSS class لما الـ route بتاع اللينك ده يكون active.
- `:id` — route parameter (جزء ديناميكي).

**قراءة الـ Parameters:**
```typescript
private route = inject(ActivatedRoute);
ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');       // route param
  const ref = this.route.snapshot.queryParamMap.get('ref');       // ?ref=email query param
}
```
**التنقل البرمجي (Programmatic navigation):**
```typescript
private router = inject(Router);
goToCart() { this.router.navigate(['/cart']); }
```
**Redirects:** `{ path: 'old-shop', redirectTo: 'shop', pathMatch: 'full' }`

**أخطاء شائعة:**
- وضع الـ wildcard (`**`) في أي مكان غير الآخر — هيبلع كل الـ routes التانية.
- استخدام `snapshot` لما نفس الـ component ممكن يتعاد استخدامه لقيم params مختلفة (زي التنقل بين `/products/1` و`/products/2`) — الـ snapshot مش هيتحدّث؛ استخدم الـ `paramMap` Observable بدلًا من كده.

---

## 12. Guards

**ما هو؟**
دوال بتتحكّم في السماح بالتنقل لـ/من route معيّن.

**ليه نستخدمه؟**
لحماية الـ routes — زي منع الدخول لـ `/checkout` إلا لو المستخدم مسجّل دخول.

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

**خطأ شائع →** الاعتماد على الـ guards *لوحدها* للحماية — الـ guards بتحمي الـ frontend route بس؛ الـ backend API لازم يتحقّق من الصلاحية (authorization) بشكل مستقل بردو.

---

## 13. HTTP & APIs

**ما هو؟**
`HttpClient` هو service Angular بتاع عمل HTTP requests لـ backend (REST API).

**الإعداد (standalone apps):**
```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};
```
**الاستخدام:**
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
**HTTP methods:** GET (قراءة)، POST (إنشاء)، PUT (استبدال كامل)، PATCH (تحديث جزئي)، DELETE (حذف).
**Status codes:** 200 OK، 201 Created، 400 Bad Request، 401 Unauthorized، 403 Forbidden، 404 Not Found، 500 Server Error.
**Query params:** `this.http.get('/products', { params: { category: 'electronics' } })` → `/products?category=electronics`
**Headers:** `this.http.get('/orders', { headers: { Authorization: 'Bearer token' } })`

**نقطة مهمة →** methods بتاعة `HttpClient` بترجّع **Observables**، مش Promises — ملهاش أي تنفيذ لحد ما تعمل `.subscribe()`.

**خطأ شائع →** نسيان الـ subscribe — الـ request مش بيتنفّذ خالص.

---

## 14. Observables & RxJS

**ما هو؟**
RxJS هي library للتعامل مع تدفقات بيانات غير متزامنة (asynchronous data streams). الـ **Observable** بيمثّل تدفّق قيم عبر الوقت تقدر تعمله subscribe.

**ليه Angular بيستخدم Observables →** الـ HTTP calls وevents المستخدم وevents الـ router — كلها async بطبيعتها وممكن تصدر (emit) أكتر من مرة (عكس الـ Promise، اللي بيتحل مرة واحدة بس). الـ Observables كمان بتدعم تركيب قوي (composition) عن طريق operators، وقابلة للإلغاء (cancellable).

```typescript
this.http.get<Product[]>('/products').subscribe({
  next: (products) => console.log(products),
  error: (err) => console.error(err),
  complete: () => console.log('تم')
});
```
**الأنواع الأساسية:**
- `Observable` — النوع الأساسي للـ stream.
- `Subject` — Observable تقدر تحقن قيم فيه يدويًا (`.next(value)`).
- `BehaviorSubject` — زي الـ `Subject` بس بيحتفظ بـ *قيمة حالية* وبيبعتها فورًا لأي subscriber جديد. مفيد جدًا للـ shared state (زي السلة الحالية للمستخدم، cart state).

**Operators شائعة:**
```typescript
this.http.get<Product[]>('/products').pipe(
  map(products => products.filter(p => p.inStock)), // تحويل القيم الصادرة
  tap(products => console.log('تم الجلب', products)), // side effect، مش بيغيّر الـ stream
  catchError(err => of([]))                            // التعامل مع الأخطاء بأمان
).subscribe(products => this.products = products);

searchInput$.pipe(
  debounceTime(300),          // استنى المستخدم يوقف عن الكتابة
  switchMap(term => this.productService.search(term)) // إلغاء الـ request السابق وابدأ واحد جديد
).subscribe(results => this.searchResults = results);
```
**Observable vs Promise:**
| | Observable | Promise |
|---|---|---|
| القيم | متعددة عبر الوقت | قيمة واحدة |
| Lazy | آه (بيشتغل عند `.subscribe()`) | لأ (بيشتغل فورًا) |
| قابل للإلغاء | آه (`.unsubscribe()`) | لأ |
| Operators | كتير (map، filter، إلخ) | محدودة (`.then`) |

**Async Pipe →** بيعمل subscribe/unsubscribe تلقائي في الـ template — الطريقة الموصى بيها للتعامل مع Observables في الـ views:
```html
<div *ngFor="let product of products$ | async">{{ product.name }}</div>
```

**أخطاء شائعة:**
- نسيان unsubscribe من `.subscribe()` اليدوي في components (خصوصًا Subjects طويلة العمر) — بيسبب memory leaks. الأفضل استخدام الـ `async` pipe أو `takeUntilDestroyed()`.
- عمل subscribes متداخلة بدل استخدام `switchMap`/`mergeMap` — بيعمل "callback hell" وrequests مكررة.

---

## 15. Authentication

**ما هو؟**
التحقّق من *هوية* المستخدم (authentication) مقابل *صلاحياته* (authorization).

**السيناريو المعتاد (Typical flow):**
1. المستخدم بيبعت form تسجيل الدخول ← POST لـ `/auth/login`.
2. الـ backend بيرجّع **JWT (JSON Web Token)**.
3. تخزين الـ token (غالبًا `localStorage`، رغم إن الـ httpOnly cookies أأمن ضد XSS).
4. **AuthService** بيعرض حالة تسجيل الدخول الحالية، غالبًا عن طريق `BehaviorSubject<boolean>` أو `BehaviorSubject<User | null>` عشان الـ components تعرف بشكل تفاعلي لو المستخدم مسجّل دخول.
5. **Interceptor** (قسم 16) بيلحق الـ token تلقائيًا على الـ requests الصادرة.
6. **Guard** بيحمي الـ routes اللي محتاجة تسجيل دخول.

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

**خطأ شائع →** تخزين tokens حساسة في `localStorage` من غير فهم مخاطر XSS — مناسب للمشاريع التعليمية، لكن التطبيقات في الإنتاج غالبًا بتفضّل httpOnly cookies.

---

## 16. HTTP Interceptors

**ما هو؟**
دوال بتعترض (intercept) كل HTTP request صادر / response واصل، وبتخليك تعدّل أو تتفاعل معاهم بشكل عام (globally).

**ليه نستخدمه؟**
بيتفادى تكرار نفس المنطق (إضافة auth headers، logging، معالجة الأخطاء) في كل service call لوحدها.

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

**استخدامات شائعة →** إلحاق JWT tokens، معالجة أخطاء عامة (زي التحويل لصفحة تسجيل الدخول عند 401)، تسجيل (logging) الـ requests، إظهار/إخفاء loading spinner عام.

---

## 17. Standalone Components

**ما هو؟**
من Angular 14 (والافتراضي من v17)، الـ components ممكن تعرّف الـ dependencies بتاعتها (`imports: [...]`) مباشرة، من غير ما تحتاج `NgModule`.

**ليه نستخدمه؟**
بيبسّط الموديل الذهني (mental model) — مفيش أكتر boilerplate بتاع `NgModule` للمشاريع الصغيرة؛ تتبّع أوضح للـ dependencies لكل component.

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
  imports: [CommonModule, RouterLink], // imports على مستوى الـ component
  template: `...`
})
export class ProductsComponent {}
```

**نقطة مهمة →** دي دلوقتي الطريقة الحديثة الافتراضية لبناء تطبيقات Angular — المشاريع الجديدة اللي بتتعمل بالـ CLI بتكون standalone بشكل افتراضي.

---

## 18. Change Detection

**ما هو؟**
الآلية اللي Angular بيستخدمها عشان يكتشف لما البيانات تتغيّر ويحدّث الـ DOM على أساس كده.

**إزاي بيشتغل (classic/Zone.js-based) →** Angular بيعمل patch للـ async browser APIs (عن طريق **Zone.js**) — timers، events، HTTP calls — عشان يعرف "ممكن يكون حصل تغيير"، وبعدين بيمشي على شجرة الـ components ويفحص الـ bindings عشان يلاقي أي تغييرات.

**`OnPush` change detection strategy:**
```typescript
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
```
مع `OnPush`، Angular بيعيد فحص الـ component بس لما: الـ reference بتاعة `@Input()` تتغيّر، أو حدث يطلع من جوه الـ component نفسه، أو Observable مربوط عن طريق `async` pipe يصدر قيمة. ده بيتفادى فحوصات غير ضرورية — تحسين أداء (performance optimization) كبير.

**مشاكل أداء شائعة:**
- نداء دوال مباشرة في الـ templates (`{{ calculateTotal() }}`) — بتشتغل في *كل* change detection cycle، حتى لو مفيش حاجة اتغيّرت فعلًا.
- تعديل objects/arrays في مكانها بدل عمل references جديدة — ده بيكسر `OnPush` detection، لأن Angular بيقارن بالـ reference.

---

## 19. Signals (modern Angular reactivity)

**ما هو؟**
الـ Signal هو حاوية قيمة تفاعلية (reactive value container) — قراءته جوه context تفاعلي بتتبّعه تلقائيًا كـ dependency، وتحديثه بيبلّغ أي حاجة معتمدة عليه تلقائيًا.

```typescript
import { signal, computed, effect } from '@angular/core';

const cartCount = signal(0);
const cartLabel = computed(() => `Cart (${cartCount()})`); // بيعاد حسابه تلقائيًا

effect(() => {
  console.log(`عدد عناصر السلة الآن: ${cartCount()}`); // بيشتغل كل ما cartCount يتغيّر
});

cartCount.set(5);              // تعيين قيمة جديدة
cartCount.update(v => v + 1);  // تحديث بناءً على القيمة السابقة
```

**شرح الكود:**
- `signal(0)` — بيعمل signal بقيمة بداية `0`. تقراه عن طريق ما *تناديه* كأنه دالة: `cartCount()`.
- `computed(...)` — بيشتق signal جديد من signals تانية؛ بيعيد الحساب تلقائيًا وبشكل lazy، بس لما يتقرا بعد ما dependency تتغيّر.
- `effect(...)` — بيشتغل side effect تلقائيًا كل ما أي signal بيقراه يتغيّر.

**Signals vs Observables:**
| | Signals | Observables |
|---|---|---|
| متزامن/غير متزامن | قيم متزامنة (synchronous) | ممكن تكون streams غير متزامنة |
| الاشتراك | مفيش subscribe/unsubscribe يدوي | محتاج subscribe/unsubscribe |
| الاستخدام | حالة الـ component، تفاعل الـ UI | HTTP، events، pipelines معقّدة async |

**نستخدمه إمتى؟ →** الـ Signals بقت الطريقة المفضّلة لإدارة حالة الـ component المحلية بشكل تفاعلي؛ الـ Observables لسه أساسية للـ streams غير المتزامنة زي HTTP وتركيب الأحداث المعقّد. كتير من التطبيقات بتستخدم الاتنين مع بعض.

---

## 20. Angular Application Architecture

**تدفّق البيانات المعتاد (Typical data flow):**
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
الـ component بيطلب من service البيانات؛ الـ service بينادي الـ backend عن طريق `HttpClient`؛ الـ response بيرجع لفوق كـ Observable (أو Signal، لو حوّلته) الـ component بيعمله subscribe أو يربطه بالـ template.

```
ProductDetailComponent → Router → authGuard → CheckoutComponent
```
لما تتنقل لـ route، أي guards بتشتغل الأول؛ بس لو رجّعت `true`، الـ router بيفعّل ويعرض الـ component المستهدف.

```
CartService → BehaviorSubject/Signal (cart state) → CartIconComponent / CartPageComponent
```
الـ services بتعرض الـ state كـ Observables/Signals؛ الـ components بتستهلكها (يفضّل عن طريق الـ `async` pipe أو قراءة الـ signals في الـ template) عشان الـ UI يتحدّث بشكل تفاعلي من غير إدارة subscription يدوية.

---

## 21. Best Practices

- **Single Responsibility:** الـ components تتعامل مع الـ UI/العرض بس؛ الـ services تتعامل مع البيانات/منطق العمل.
- **Separation of concerns:** متحطّش HTTP calls جوه الـ components — حطّها في services.
- **Reusable components:** صغيرة ومركّزة وقابلة للإعداد عن طريق `@Input`/`@Output` (زي `ProductCardComponent` اللي تقدر تستخدمها في أكتر من صفحة).
- **Naming conventions:** `kebab-case` للـ selectors (`app-product-card`)، `PascalCase` للـ classes، أسماء ملفات على شكل `feature.type.ts` (زي `product.service.ts`).
- **Folder structure:** نظّم حسب الـ feature (`products/`, `cart/`, `checkout/`) بدل حسب النوع، لأي مشروع أكبر من الصغير جدًا.
- **تجنّب تكرار الكود:** استخرج المنطق المشترك في services أو pipes أو دوال مساعدة (utility functions).
- **معالجة الأخطاء (Error handling):** دايمًا عالج أخطاء HTTP (`catchError`)، ومتخلّيش فشل غير معالَج يكسر الـ UI بصمت.
- **الأمان (Security):** متعتمدش على فحوصات client-side بس (guards، أزرار disabled) — الـ backend لازم دايمًا يتحقّق/يفوّض بشكل مستقل.
- **الأداء (Performance):** استخدم `OnPush` مع بيانات immutable، `track` في `@for`، lazy-load لـ feature routes، تجنّب الـ memory leaks بعمل unsubscribe.
- **كود نظيف (Clean code):** دوال صغيرة، أسماء واضحة، تجنّب منطق متداخل بعمق في الـ templates.

---

## Angular Fundamentals Checklist

**🟢 Must understand (الأساسيات، قبل أي حاجة تانية)**
- Components، templates، data binding (interpolation، property، event، two-way)
- `*ngIf`/`*ngFor` والحديث `@if`/`@for`/`@switch`
- `@Input`/`@Output`
- أساسيات Services + Dependency Injection
- `ngOnInit`/`ngOnDestroy`
- Reactive Forms أساسية (`FormGroup`، `FormControl`، validators)
- أساسيات Routing (`RouterOutlet`، `routerLink`، route params)
- `HttpClient` GET/POST + `.subscribe()` على Observable
- أساسيات TypeScript: types، interfaces، classes

**🟡 Should understand (متوسط، مطلوب لتطبيقات حقيقية)**
- Pipes (built-in + custom، pure vs impure)
- كل الـ lifecycle hooks
- Guards
- RxJS operators (`map`، `switchMap`، `catchError`، `debounceTime`)
- `BehaviorSubject` والـ shared state عن طريق services
- Async pipe
- HTTP Interceptors
- تدفّق Authentication (JWT، AuthService)
- Standalone components و`app.config.ts`

**🔵 Good to know (احترافي/متقدّم)**
- تفاصيل change detection الداخلية، Zone.js، `OnPush`
- Signals (`signal`، `computed`، `effect`) وعلاقتها بالـ Observables
- Hierarchical DI / providers على مستوى component
- `FormArray` والـ forms الديناميكية
- تقنيات تحسين الأداء (performance optimization)
- الاختبار (Testing) بـ Jasmine/Karma أو Jest

---

## Fundamentals Assessment Test

**A. Multiple Choice**
1. أي binding syntax بيبعت بيانات من الـ template *لـ* class الـ component؟
   a) `{{ }}`  b) `[property]`  c) `(event)`  d) `[(ngModel)]`
2. إيه اللي بيعمله `providedIn: 'root'`؟
   a) بيحصر الـ service على component واحد  b) بيعمل singleton متاح على مستوى التطبيق كله  c) بيعطّل الـ service  d) مفيش تأثير، مجرد تزيين اختياري
3. أنهي lifecycle hook هو الأفضل لجلب البيانات الأولية (initial data)؟
   a) constructor  b) ngOnChanges  c) ngOnInit  d) ngAfterViewInit
4. إيه الفرق الأساسي بين Promise وObservable؟
   a) الـ Promises أسرع  b) الـ Observables ممكن تصدر أكتر من قيمة عبر الوقت وقابلة للإلغاء  c) هما نفس الحاجة  d) الـ Promises بتستخدم RxJS

**B. Code Reading**
```typescript
@Component({ selector: 'app-x', standalone: true, template: `<p>{{ getTotal() }}</p>` })
export class X {
  getTotal() { console.log('called'); return 100; }
}
```
سؤال: ليه نداء `getTotal()` مباشرة في الـ template ده ممارسة سيئة (bad practice)؟ وهتستخدم إيه بدلًا منها؟

**C. "What happens if...?"**
1. إيه اللي بيحصل لو نسيت `track` جوه `@for` loop الحديث؟
2. إيه اللي بيحصل لو نسيت تعمل `.subscribe()` لـ HTTP call؟
3. إيه اللي بيحصل لو component بيستخدم `OnPush` عدّل array في مكانه (`arr.push(x)`) بدل ما يعمل array جديد؟

**D. Practical Coding**
اكتب standalone Angular component اسمه `CartCounterComponent` بحيث:
- يعرض عدد عناصر السلة بادئًا من 0
- عنده زرارين "Add Item" و"Remove Item"
- بيصدر حدث `@Output() countChanged` بالقيمة الجديدة كل ما العدد يتغيّر

**E. Debugging**
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  items = [];
  addItem(item: any) { this.items.push(item); }
}

@Component({ providers: [CartService], ... }) // <-- المشكلة هنا
export class CartPageComponent { ... }
```
سؤال: التطبيق فيه أكتر من component متوقّعين إنهم يشاركوا نفس السلة، لكن العناصر اللي بتتضاف في component واحد مش بتظهر في التاني. إيه المشكلة، وإزاي تحلّها؟

---

> 📌 هذا الملف مرجعي لمشروعك — راجعه أثناء بناء الـ E-commerce app، وكل ما تتعلم موضوع جديد بالتفصيل معايا، ارجع هنا للمراجعة السريعة.
