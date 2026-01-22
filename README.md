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

![image-20260121161713654](./assets/image-20260121161713654.png)

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

```js
require('dotenv').config()
```



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

#### Structure and init

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

```
blog-list/
├── controllers/          # router
│   └── blogs.js
├── models/               # Schema definitions
│   └── blog.js
├── utils/                
│   ├── config.js         
│   ├── logger.js         
│   └── middleware.js     
├── .env                  # PORT, MONGODB_URI
├── .gitignore          
├── app.js                
├── index.js              
└── package.json
```

Find the max element using reduce:

reduce(lastResult,current object)=>{

}

```js
//method1
const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }) 
}
//method2
const maxLikes = Math.max(...blogs.map(b => b.likes))
return blogs.find(blog => blog.likes === maxLikes)

Notice: Math.max needs a list of numbers as arguments, rather than an array.
```

### 4.6

#### lodash usage

```
npm install lodash
```

### 4.20

```
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhibG92byIsImlkIjoiNjk3MTRiYTVlMmExYThiZmNhNGU0NDQ0IiwiaWF0IjoxNzY5MDcxODc0fQ.9_g5tIuZMhKJaWvPlCkulYU5YWXlvyUthcFfIR5oTNs
```

```
{
  "username": "hblovo",
  "name": "Helsinki User",
  "password": "secretpassword123"
}
```

## Part5

### 5.9

![7f753067-8f76-4cf4-bd22-a0c7fdcb9255](./assets/7f753067-8f76-4cf4-bd22-a0c7fdcb9255.png)

**username missed**

The backend uses `.populate('user')` in `GET` requests, so the frontend receives `blog.user` as a **complete object** containing both `name` and `id`

src/services/blogs.js

```js
const updateBlog = async(id,blog)=>{
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}
```

part4/bloglist/controllers/blogs.js

```js
blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body 
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        {likes : likes},
        {new : true}
    )

    response.json(updatedBlog)
})
```

The frontend replaces the "full" object with this "slimmed" one, causing `blog.user.name` to become `undefined`.

### 5.13

#### Test

```
npm test --watch ./src/components/test/Blog.test.jsx         npm test --watch ./src/components/test/BlogForm.test.jsx                                              
```

