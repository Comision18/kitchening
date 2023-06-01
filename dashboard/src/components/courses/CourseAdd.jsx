import { useEffect, useState } from "react";
import { UseFetch } from "../../hooks/UseFetch";
import { useFormik } from "formik";
import validate from "../../validations/courseAddValidator";

export const CourseAdd = () => {
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    UseFetch("/categories")
      .then(({ ok, data }) => {
        const { categories } = data;
        ok && setCategories(categories);
      })
      .catch(() => console.error);
    UseFetch("/chefs")
      .then(({ ok, data }) => {
        const { chefs } = data;
        ok && setChefs(chefs);
      })
      .catch(() => console.error);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      chef: "",
      category: "",
      price: "",
      discount: 0,
      description: "",
      free: false,
      visible: false,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Agregar Curso </h4>
      </div>
      <hr />
      <form className="row" onSubmit={formik.handleSubmit}>
        <div className="col-12 mb-3">
          <label htmlFor="name" className="form-label">
            Titulo *
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.errors.title
                ? "is-invalid"
                : !formik.errors.title && formik.values.title
                ? "is-valid"
                : null
            }`}
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {<small className="text-danger">{formik.errors.title}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="chef" className="form-label">
            Chef *
          </label>
          <select
            className="form-control"
            name="chef"
            onChange={formik.handleChange}
            value={formik.values.chef}
          >
            <option hidden defaultValue value="">
              Seleccione...
            </option>
            {chefs.map((chef, index) => (
              <option value={chef.id} key={index}>
                {chef.name}
              </option>
            ))}
          </select>
          {<small className="text-danger">{formik.errors.chef}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Categoría *
          </label>
          <select
            className="form-control"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            <option hidden defaultValue value="">
              Seleccione...
            </option>
            {categories.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="discount" className="form-label">
            Descuento
          </label>
          <input
            type="number"
            className="form-control"
            name="discount"
            onChange={formik.handleChange}
            value={formik.values.discount}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            className="form-control"
            name="description"
            style={{ resize: "none" }}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="col-12 mb-3">
          <div className="d-flex justify-content-around">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="free"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={formik.handleChange}
                checked={formik.values.free}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Gratuito
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="visible"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={formik.handleChange}
                checked={formik.values.visible}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Visible
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3">
          <input
            className="form-control"
            type="file"
            name="image"
            id="image"
            hidden
          />
          <div className="d-flex align-items-center justify-content-around">
            <label className="btn btn-success my-1" htmlFor="image">
              Cargar imagenes *
            </label>
            <button className="btn btn-dark my-1 " onClick={formik.handleReset}>
              Limpiar
            </button>
            <button className="btn btn-primary my-1" type="submit">
              Guardar
            </button>
          </div>
        </div>

        <div className="col-12"></div>
      </form>
    </>
  );
};
