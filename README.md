
# The Foodie Bloogers

It's a blogging website where you can perform CRUD operations i.e CREATE-BLOG, UPDATE-BLOG, READ-BLOG AND DELETE BLOG such that it belongs to you. Also you can see other users blogs, can access about page after login and authentication, access contact page with all fields except message being prefilled such that you are registered and logged in user. The website also offers a good home page UI.

## Key Features

It is a blogging/content based website where user can:
- signup, login and contact
- see/read other's blogs 
- save, like/upvote and comment on others blogs after being authenticated.
- can access a highly helpful search page which shows results by accepting any fields. 
- Results on search page are displayed based on search text matching with that of blog title/food/content/ writer's name etc.

On login user gets access to following features:
- Writing and posting the blog
- Editing/Deleting only his own blog
- Liking, commenting and saving useful blogs
- a profile page showing the user information and creating user for user to write/ perform operations on written blogs and access the save dblogs

# The file/folder structure

#### Server Folder

```
This is the main folder of projects. It has all impoortant sub folders
namely Authentication, client, db, models and routers.
```
#### Server folder sub-folders and their significance/ key role in project

| Folder Name | Realted to     | Description        | 
| :-------- | :------- | :------------------------- |
| `Authentication` | `Backend` | **Authenticates** the user using jwt token. |
| `client` | `Frontend` | **Deals with client side**, the User Interface and other frontend features are implemented in this folder.|
| `db` | `Backend` | **Connection with database** is established using this folder. |
| `models` | `Backend` | **The schemas** for all entities of the project are defined here. |
| `Authentication` | `Backend` | **Authenticates** the user using jwt token. |
| `routers` | `Backend` | **All API routes** are designed and implemented in this folder. |



## Scope for Improvement

- UI can be improved.
- Recover password option.
- Cloudinary for image upload from device directly
- Better searching algorithms
- Integration of Algorithms to study user's behaviour based on recent likes and shares to display blogs that he's/she's willing to read.



