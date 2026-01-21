# FullStackOpen

## Part 1&2

```
Create new project using npm
npm create vite@latest [project_name] -- --template react

cd anecdotes

npm install

npm run dev
```

## Part 3

### 3.10

[Backend Service Link]([fullstackopen-au2i.onrender.com](https://fullstackopen-au2i.onrender.com/))

![5e89ff31-660a-481f-92b9-543424a20244](./assets/5e89ff31-660a-481f-92b9-543424a20244.png)

```
MongoDB
user
Password

mongodb+srv://user:Password@cluster0.knzdzc2.mongodb.net/?appName=Cluster0
```

Test cmd:

`node mongo.js Password "Arto Hellas" 040-123456`

### 3.13

use `dotenv` to set the environmental vars

### 3.15

Problems faced:

```
const person = new Person({
        name:body.name,
        number:body.number
    })
```

当执行 `const person = new Person(...)` 时，Mongoose 会为这个新对象分配一个**全新的 `_id`**。当把这个带有新 ID 的对象传给 `findByIdAndUpdate` 时，Mongoose 会尝试修改原始文档的 `_id`。MongoDB 默认**不允许修改 `_id`**，这会导致内部错误，或者导致 Mongoose 找不到对应的匹配项，从而返回 404。

### 3.21

#### pack the frontend

```
npm run build 
```

Then copy the `dist` dir to the backend folder.

### 3.22

#### esint

```
npm install eslint @eslint/js --save-dev
```

## Part4

### 4.1

```
mkdir blog-list
cd blog-list
npm init -y

npm install express cors mongoose
npm install --save-dev nodemon eslint @eslint/js globals
```

```
package.json

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "lint": "eslint ."
}
```

