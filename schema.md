# Arpit's Schema

## Users
```
id: int
name: varchar(256)
username: varchar(256)
password: varchar(256)
email: varchar(256),
roles: varchar(256)
```

**Note:** `roles` is a comma-separated-values field. the list will be stored as comma-separated, fully lowercase.

User Roles:
- admin
- user
- analyst