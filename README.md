#### Hi there

##### development
> npm run start:dev

##### deploy
> npm run build

> npm run start

##### envs
 - PORT - daemon PORT
 - HOST - daemon HOST
 - SECRET - auth secret key
 - MONGO_URL - mongodb url connection

##### Help
@protected - request must provide header Authorization formatted as "Token ${token}"

##### api
###### POST user/signin
```typescript
type requestBody = {
  email: string
  password: string
}
type responseType = {
  token: string
}
```
###### POST user/signup
```typescript
type requestBody = {
  email: string
  first_name: string
  last_name: string
  password: string
}
type responseType = void
```
###### GET user/profile
@protected
```typescript
type responseType = {
  email: string
  first_name: string
  last_name: string
}
```
###### GET posts/
```typescript
type responseType = {
  page: number
  hasNext: boolean
  results: Array<{
    id: string
    title: string
    subTitle: string
    text: string
    author: {
      id: string
      email: string
    }
  }>
}
```


