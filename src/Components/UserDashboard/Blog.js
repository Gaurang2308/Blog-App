import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Card from "../Navbar/Card";
import Nav from "../Navbar/Nav";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter the title.")
    .min(1, "Name must be at least 1 character.")
    .max(100, "Name must be at most 50 characters."),
  description: yup
    .string()
    .required("Please enter the description.")
    .min(1, "Name must be at least 1 character.")
    .max(250, "Name must be at most 200 characters."),
  url: yup.string().required("Please enter image url."),
});

const Blog = () => {
  const [card, setCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getallcards();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const closeDialogHandler = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getallcards = async () => {
    const response = await fetch(
      "https://6630e648c92f351c03db7f68.mockapi.io/api/AddBlog",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setCard(result);
  };

  const onSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "https://6630e648c92f351c03db7f68.mockapi.io/api/AddBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Assuming you want to dispatch an action after successful registration

      // Reset form
      getallcards();
      reset();
      setIsModalOpen(false);

      // Assuming reset is defined somewhere to clear form data

      // Navigate to home page after successful registration
      // navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <Nav showCard={false} />
      <div className="d-grid mx-5 my-3 d-md-flex justify-content-md-end">
        <button className="btn btn-primary" onClick={handleEditClick}>
          Add Blog
        </button>
      </div>
      <Card
        card={card}
        getallcards={getallcards}
        handleEditClick={handleEditClick}
      />
      {isModalOpen && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div
            className="modal"
            // aria-hidden="true"
          >
            <div className="modal-dialog w-100">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Blog here
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Title:
                    </label>
                    <input
                      {...register("title")}
                      name="title"
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                    <span className="errormessage">
                      {errors.title?.message}
                    </span>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Description:
                    </label>
                    <input
                      {...register("description")}
                      name="description"
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                    <span className="errormessage">
                      {errors.description?.message}
                    </span>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Image URL
                    </label>
                    <input
                      {...register("url")}
                      name="url"
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                    <span className="errormessage">{errors.url?.message}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeDialogHandler}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Blog;
