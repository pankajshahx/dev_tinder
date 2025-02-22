# **HTTP Methods Guide**

## **1. What are HTTP Methods?**

HTTP methods are used to indicate the desired action to be performed on a resource in a web server. Each method has a specific purpose and behavior.

---

## **2. Common HTTP Methods**

| HTTP Method | Purpose                                      | Example                                                         |
| ----------- | -------------------------------------------- | --------------------------------------------------------------- |
| **GET**     | Retrieve data from the server (read-only)    | `GET /users` (Fetch all users)                                  |
| **POST**    | Send data to create a new resource           | `POST /users` (Create a new user)                               |
| **PUT**     | Update an existing resource (full update)    | `PUT /users/1` (Update user with ID 1)                          |
| **PATCH**   | Partially update an existing resource        | `PATCH /users/1` (Update only specific fields)                  |
| **DELETE**  | Remove a resource from the server            | `DELETE /users/1` (Delete user with ID 1)                       |
| **HEAD**    | Same as GET but without the response body    | `HEAD /users` (Check if resource exists)                        |
| **OPTIONS** | Retrieve allowed HTTP methods for a resource | `OPTIONS /users` (Returns allowed methods like GET, POST, etc.) |

---

## **3. Differences Between HTTP Methods**

| Feature              | GET        | POST                | PUT                    | PATCH                   | DELETE          |
| -------------------- | ---------- | ------------------- | ---------------------- | ----------------------- | --------------- |
| Purpose              | Fetch data | Create new resource | Update entire resource | Update partial resource | Remove resource |
| Idempotent?          | ✅ Yes     | ❌ No               | ✅ Yes                 | ❌ No                   | ✅ Yes          |
| Has Body?            | ❌ No      | ✅ Yes              | ✅ Yes                 | ✅ Yes                  | ❌ No           |
| Affects Server Data? | ❌ No      | ✅ Yes              | ✅ Yes                 | ✅ Yes                  | ✅ Yes          |

🔹 **Idempotent** → If the request is repeated multiple times, the result remains the same.

---

## **4. Example Requests Using cURL**

### **GET Request**

```bash
curl -X GET http://example.com/users
```

### **POST Request** (Create a new user)

```bash
curl -X POST http://example.com/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
```

### **PUT Request** (Update user)

```bash
curl -X PUT http://example.com/users/1 -H "Content-Type: application/json" -d '{"name": "Updated Name", "email": "updated@example.com"}'
```

### **PATCH Request** (Partial update)

```bash
curl -X PATCH http://example.com/users/1 -H "Content-Type: application/json" -d '{"email": "newemail@example.com"}'
```

### **DELETE Request**

```bash
curl -X DELETE http://example.com/users/1
```

---

This guide provides an overview of HTTP methods, their differences, and usage examples. Understanding these methods is essential for working with RESTful APIs. 🚀

# **HTTP Methods Explained**

## **1. GET**

- Used to retrieve data from a server.
- Should not change server state.

**Example using Express:**

```javascript
app.get("/users", (req, res) => {
  res.json({ message: "Fetched users successfully" });
});
```

## **2. POST**

- Used to send data to a server to create a resource.

**Example using Express:**

```javascript
app.post("/users", (req, res) => {
  res.json({ message: "User created successfully" });
});
```

## **3. PUT**

- Used to update an existing resource or create if it doesn’t exist.
- Replaces the entire resource.

**Example using Express:**

```javascript
app.put("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} updated successfully` });
});
```

## **4. PATCH**

- Used to update partial data of an existing resource.

**Example using Express:**

```javascript
app.patch("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} partially updated` });
});
```

## **5. DELETE**

- Used to remove a resource from the server.

**Example using Express:**

```javascript
app.delete("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted successfully` });
});
```

## **6. OPTIONS**

- Used to describe communication options for the target resource.

**Example using Express:**

```javascript
app.options("/users", (req, res) => {
  res.set("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.sendStatus(200);
});
```

## **7. HEAD**

- Similar to GET, but only retrieves headers, no body content.

**Example using Express:**

```javascript
app.head("/users", (req, res) => {
  res.sendStatus(200);
});
```

---

## **Key Differences Between HTTP Methods**

| Method  | Purpose                   | Idempotent | Request Body |
| ------- | ------------------------- | ---------- | ------------ |
| GET     | Retrieve data             | ✅ Yes     | ❌ No        |
| POST    | Create a new resource     | ❌ No      | ✅ Yes       |
| PUT     | Replace a resource        | ✅ Yes     | ✅ Yes       |
| PATCH   | Update part of a resource | ❌ No      | ✅ Yes       |
| DELETE  | Remove a resource         | ✅ Yes     | ❌ No        |
| OPTIONS | Get communication options | ✅ Yes     | ❌ No        |
| HEAD    | Get headers only          | ✅ Yes     | ❌ No        |

🚀 Now you can use these methods efficiently in your Express applications!
