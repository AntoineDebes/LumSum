#lumsum.io backend

https://medium.com/@martinseanhunt/how-to-invalidate-cached-data-in-apollo-and-handle-updating-paginated-queries-379e4b9e4698

https://github.com/typeorm/typeorm/issues/1231

// migration

https://wanago.io/2019/01/28/typeorm-migrations-postgres/

## TODO

### Super Admin

| Done? | Task                |
| :---: | ------------------- |
|  ✅   | Add Admin           |
|  ✅   | Edit Admin          |
|  ✅   | Delete Admin        |
|  ✅   | Access Grant Admin  |
|  ✅   | Access Revoke Admin |
|  ✅   | admins              |
|  ✅   | admin               |

### Admin

| Done? | Task              |
| :---: | ----------------- |
|  ⬜️  | Featured Supplier |
|  ✅   | Favorite Supplier |

### Admin

| Done? | Task            |
| :---: | --------------- |
|  ⬜️  | Supplier Search |

### Blog

| Done? | Task             |
| :---: | ---------------- |
|  ✅   | Add Blog Post    |
|  ✅   | Edit Blog Post   |
|  ✅   | Delete Blog Post |
|  ✅   | Blogs Post       |
|  ✅   | Blog Post        |

1. Mobile view of admin product page needs to be corrected. 
2. Product edit list should work properly in admin product. 
3. Categories description design change in front end. 
4. Filter option in search should be there. (Frontend) 
5. Filter option in mobile view 
6. Name tags logo in supplier details page.

### Requirements: 
    node: v14.17.3
    postgreSQL: 13
    npm: 6.14.15 
    ubuntu: 20.02
    
### Setting env & running app (dev):    
    0. Make sure you have a right installed version of requirements
    1. Create a database (lumsum) for postgres ```CREATE DATABASE lumsum ``` 
    2. Set your database_name in .env ```DB_DATABASE_NAME=lumsum```
    3. Set in .env ``` DATABASE_URL="postgres://cdbavdvbkvegpz:95967a5a797b02876655b622f02fda0996d0c0fff17e137c1c0ddc4d88465a06@ec2-18-209-153-180.compute-1.amazonaws.com:5432/detumv4kd91c68"``` 
    3. npm i
    4. npm run dev
    

