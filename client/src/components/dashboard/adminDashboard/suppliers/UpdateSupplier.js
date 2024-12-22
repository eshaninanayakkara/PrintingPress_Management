import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const UpdateSuppliers = () => {
  const { id } = useParams();
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier/getSupplier/" + id)
      .then((result) => {
        console.log(result);
        setSupplierID(result.data.supplierID);
        setSupplierName(result.data.supplierName);
        setCompanyName(result.data.companyName);
        setCompanyAddress(result.data.companyAddress);
        setEmailAddress(result.data.emailAddress);
        setPhoneNumber(result.data.phoneNumber);
      })
      .catch((err) => console.log(err));
  }, []);

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    const errors = {};
    if (!supplierID.trim()) {
      errors.supplierID = "Supplier ID is required";
    }
    if (!supplierName.trim()) {
      errors.supplierName = "Supplier Name is required";
    }
    if (!companyName.trim()) {
      errors.companyName = "Company Name is required";
    }
    if (!companyAddress.trim()) {
      errors.companyAddress = "Company Address is required";
    }
    if (!emailAddress.trim()) {
      errors.emailAddress = "Email Address is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailAddress)) {
        errors.emailAddress = "Please enter a valid email address";
      }
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        errors.phoneNumber = "Please enter a valid 10-digit phone number";
      }
    }

    // If there are errors, set them in the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If all validations pass, proceed with submitting the form
    axios
      .put("http://localhost:5000/supplier/updateSupplier/" + id, {
        supplierID,
        supplierName,
        companyName,
        companyAddress,
        emailAddress,
        phoneNumber,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin/suppliers");
      })
      .catch((err) => console.log(err));

    alert(`Supplier has been updated.`);
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Update Supplier</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="sID" className="form-label">
                Supplier ID
              </label>
              <input
                type="text"
                className="form-control"
                id="sID"
                value={supplierID}
                onChange={(e) => setSupplierID(e.target.value)}
              />
              {errors.supplierID && (
                <div className="text-danger">{errors.supplierID}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="sName" className="form-label">
                Supplier Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
              {errors.supplierName && (
                <div className="text-danger">{errors.supplierName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="sCompany" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sCompany"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {errors.companyName && (
                <div className="text-danger">{errors.companyName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="sAddress" className="form-label">
                Company Address
              </label>
              <input
                type="text"
                className="form-control"
                id="sAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              {errors.companyAddress && (
                <div className="text-danger">{errors.companyAddress}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="sEmail" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="sEmail"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              {errors.emailAddress && (
                <div className="text-danger">{errors.emailAddress}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="sPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="sPhone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <div className="text-danger">{errors.phoneNumber}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default UpdateSuppliers;
