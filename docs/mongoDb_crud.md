# **MongoDB CRUD Operations with Examples**

## **1. Connect to MongoDB**

```javascript
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://username:password@cluster.mongodb.net/";
const client = new MongoClient(url);
const dbName = "YourDatabase";
```

## **2. Create (Insert Data)**

### **Insert One Document**

```javascript
async function insertUser() {
  const db = client.db(dbName);
  const collection = db.collection("Users");

  const user = {
    first_name: "John",
    last_name: "Doe",
    city: "New York",
    mobile: "1234567890",
  };

  const result = await collection.insertOne(user);
  console.log("Inserted document:", result.insertedId);
}
```

### **Insert Multiple Documents**

```javascript
await collection.insertMany([
  { first_name: "Alice", last_name: "Brown", city: "LA", mobile: "1112223333" },
  {
    first_name: "Bob",
    last_name: "White",
    city: "Chicago",
    mobile: "4445556666",
  },
]);
```

---

## **3. Read (Find Data)**

### **Find One Document**

```javascript
const user = await collection.findOne({ first_name: "John" });
console.log("Found user:", user);
```

### **Find Multiple Documents**

```javascript
const users = await collection.find({ city: "New York" }).toArray();
console.log("Users in New York:", users);
```

---

## **4. Update Data**

### **Update One Document**

```javascript
await collection.updateOne(
  { mobile: "1234567890" },
  { $set: { city: "San Francisco" } }
);
```

### **Update Multiple Documents**

```javascript
await collection.updateMany({ city: "LA" }, { $set: { city: "Los Angeles" } });
```

---

## **5. Delete Data**

### **Delete One Document**

```javascript
await collection.deleteOne({ mobile: "1234567890" });
```

### **Delete Multiple Documents**

```javascript
await collection.deleteMany({ city: "Chicago" });
```

---

## **6. Indexing for Performance**

### **Create an Index**

```javascript
await collection.createIndex({ mobile: 1 });
```

### **Check Indexes**

```javascript
console.log(await collection.indexes());
```

---

## **7. Aggregation (Advanced Querying)**

### **Group Users by City**

```javascript
const result = await collection
  .aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }])
  .toArray();
console.log(result);
```

---

## **8. Close Connection**

```javascript
await client.close();
```

---

## **Conclusion**

✔ **CRUD (Create, Read, Update, Delete) operations are essential for MongoDB.**\
✔ **Indexes improve performance by making queries faster.**\
✔ **Aggregation is useful for advanced data processing.**

🎯 **Now you can confidently work with MongoDB!** 🚀
