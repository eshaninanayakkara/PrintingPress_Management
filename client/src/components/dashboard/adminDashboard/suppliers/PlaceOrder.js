import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const PlaceOrder = () => {
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(""); // State to hold selected supplier email

  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({}); // State to hold validation errorsa

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier")
      .then((result) => setSupplier(result.data))
      .catch((err) => console.log(err));
    console.log(supplier);
  }, []);

  useEffect(() => {
    setTotalAmount(parseFloat(quantity) * parseFloat(unitPrice));
  }, [quantity, unitPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    const errors = {};
    const numberPattern = /^[0-9]+$/;

    if (!productID.trim()) {
      errors.productID = "Product ID is required";
    }
    if (!productName.trim()) {
      errors.productName = "Product Name is required";
    }
    if (!quantity.trim()) {
      errors.quantity = "Quantity is required";
    } else if (!quantity.match(numberPattern)) {
      errors.quantity = "Quantity must be a number";
    }
    if (!unitPrice.trim()) {
      errors.unitPrice = "Unit Price is required";
    } else if (!unitPrice.match(numberPattern)) {
      errors.unitPrice = "Unit Price must be a number";
    }
    if (!date.trim()) {
      errors.date = "Date is required";
    } else {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!date.match(datePattern)) {
        errors.date = "Invalid date format. Please use YYYY-MM-DD format";
      }
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }

    // If there are errors, set them in the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If all validations pass, proceed with placing the order
    alert(`The order has been placed!`);

    // Assuming you have an API endpoint to send the data
    axios
      .post("http://localhost:5000/raw/createRawMaterials", {
        productID,
        productName,
        quantity,
        unitPrice,
        totalAmount,
        date,
        description,
        supplierEmail: selectedSupplier, // Include selected supplier email in the request
      })
      .then((result) => {
        console.log(result);
        navigate("/admin/suppliers/raw-materials");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Place Order</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="PID" className="form-label">
                Product ID
              </label>
              <input
                type="number"
                className="form-control"
                id="PID"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              {errors.productID && (
                <div className="text-danger">{errors.productID}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PName" className="form-label">
                Product Name
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="PName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              >
                <option value="">Select a product</option>
                <option value="Paper">Paper</option>
                <option value="Card Stocks">Card Stocks</option>
                <option value="Ink">Ink</option>
                <option value="Binding Materials">Binding Materials</option>
                <option value="Chemicals and Solutions">
                  Chemicals and Solutions
                </option>
              </select>
              {errors.productName && (
                <div className="text-danger">{errors.productName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PSupplier" className="form-label">
                Supplier Email
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="PSupplier"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Select a supplier</option>
                {supplier.map((item) => (
                  <option key={item.id} value={item.emailAddress}>
                    {item.emailAddress}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="PQuantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="PQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && (
                <div className="text-danger">{errors.quantity}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PUnit" className="form-label">
                Unit Price
              </label>
              <input
                type="number"
                className="form-control"
                id="PUnit"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
              {errors.unitPrice && (
                <div className="text-danger">{errors.unitPrice}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PTotal" className="form-label">
                Total Amount
              </label>
              <input
                disabled
                type="number"
                className="form-control"
                id="PTotal"
                value={totalAmount}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="PDate" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="PDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <div className="text-danger">{errors.date}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="PDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="PDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default PlaceOrder;
