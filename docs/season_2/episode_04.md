# **Advanced Routing in Express.js**

## **1. Introduction to Advanced Routing**

Routing in Express.js can be more powerful using advanced patterns. We can use special characters like `+`, `*`, and `?` to handle dynamic and flexible routes.

---

## **2. Special Characters in Routing**

| Symbol | Meaning                                                  |
| ------ | -------------------------------------------------------- |
| `*`    | Matches any number of characters                         |
| `+`    | Matches one or more occurrences of the preceding pattern |
| `?`    | Makes the preceding character optional                   |

### **Example Usage**

```javascript
const express = require("express");
const app = express();

// `?` Example: Matches `/hello` or `/hell`
app.get("/hell?o", (req, res) => {
  res.send("Hello or Hell!");
});

// `+` Example: Matches `/hellooooo`
app.get("/hell+o", (req, res) => {
  res.send("Helloooooo!");
});

// `*` Example: Matches `/abcXYZdef`
app.get("/abc*def", (req, res) => {
  res.send("Wildcard matched!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## **3. Dynamic Routing**

Express allows us to define routes with parameters.

### **Example:**

```javascript
// Dynamic route example
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

---

## **4. Accepting Different Data from Routes**

Express provides `req.params`, `req.query`, and `req.body` to handle different types of input.

### **Example Usage**

```javascript
app.get("/user/:id", (req, res) => {
  res.json({
    userId: req.params.id,
    search: req.query.search, // Query parameters
  });
});
```

To handle `req.body`, ensure to use middleware:

```javascript
app.use(express.json()); // Middleware to parse JSON

app.post("/data", (req, res) => {
  res.json({ receivedData: req.body });
});
```

---

## **Conclusion**

✔ Advanced routing allows for flexible and powerful request handling.
✔ Special characters like `?`, `+`, and `*` enable dynamic matching.
✔ Express supports different data sources: `params`, `query`, and `body`.

🚀 **Mastering routing will make your Express apps more powerful!**
