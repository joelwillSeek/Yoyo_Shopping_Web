import React from "react";

/**
 *
 * i was think of making a login function where when you log in the functionality increase instead of going to another Page
 * like lets say i amd admin i will have an extra card that has a plus icon indicating add product
 */

export default function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        <li>
          <button>Add Product</button>
        </li>
        <li>
          <button>Products</button>
        </li>
        <li>
          <button>Products</button>
        </li>
      </ul>
    </div>
  );
}
