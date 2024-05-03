import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import * as yup from "yup";

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

const Card = () => {
  const [card, setCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [editindex, setEditindex] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleDescription = (index) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const editblog = async (index) => {
    setIsModalOpen(true);
    const editresult = card[index];
    setEditindex({ ...editresult, index });
  };

  const deleteblog = async (index) => {
    const response = await fetch(
      `https://6630e648c92f351c03db7f68.mockapi.io/api/AddBlog/${index + 1}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getallcards().then((res) => setCard(res));
  };

  const updateblog = async (data) => {
    try {
      const response = await fetch(
        `https://6630e648c92f351c03db7f68.mockapi.io/api/AddBlog/${
          editindex.index + 1
        }`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // If the update is successful, close the modal
        reset();
        setIsModalOpen(false);
        // Refresh the card list
        getallcards().then((res) => setCard(res));
      } else {
        console.error("Failed to update the blog post.");
      }
    } catch (error) {
      console.error("Error updating the blog post:", error);
    }
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    getallcards().then((res) => setCard(res));
  }, []);
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
    return result;
  };
  return (
    <div>
      <div className="row m-2 row-cols-1 row-cols-md-4 g-3 ">
        {card.length &&
          card.map((currelm, index) => {
            return (
              <div className="col d-flex flex-wrap" key={index}>
                <div className="card custom-card-height">
                  <img src={currelm.url} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{currelm.title}</h5>
                    <p className="card-text">
                      {expandedDescriptions[index]
                        ? currelm.description
                        : `${currelm.description.slice(0, 100)}...`}
                      {currelm.description.length > 100 && (
                        <button
                          className="btn btn-link"
                          onClick={() => toggleDescription(index)}
                        >
                          {expandedDescriptions[index]
                            ? "See less"
                            : "See more"}
                        </button>
                      )}
                    </p>
                  </div>
                  {isLoggedIn && (
                    <div className="opt-button">
                      <FaEdit size={25} onClick={() => editblog(index)} />
                      <MdDelete size={25} onClick={() => deleteblog(index)} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {isModalOpen && (
        <form onSubmit={handleSubmit(updateblog)}>
          <div
            className="modal"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
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
                    onClick={() => setIsModalOpen(false)}
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
                      defaultValue={editindex?.title || ""}
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
                      defaultValue={editindex?.description || ""}
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
                      defaultValue={editindex?.url || ""}
                    />
                    <span className="errormessage">{errors.url?.message}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default Card;
