import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UseFetch } from "../../hooks/UseFetch";
import { useFormik } from "formik";
import validate from "../../validations/courseAddValidator";
import { CourseAddImage } from "./CourseAddImage";

export const CourseAdd = ({handleAdd}) => {
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
      chefId: "",
      categoryId: "",
      price: "",
      discount: 0,
      description: "",
      free: false,
      visible: false,
      image_1 : null,
      image_2 : null,
      image_3: null
    },
    validate,
    onSubmit: (values) => {
      let data = new FormData();
      for (const key in values) {
        data.append(key, values[key])
      }
      handleAdd(data)
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
            className={`form-control ${
              formik.errors.chefId
                ? "is-invalid"
                : !formik.errors.chefId && formik.values.chefId
                ? "is-valid"
                : null
            }`}
            name="chefId"
            onChange={formik.handleChange}
            value={formik.values.chefId}
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
          {<small className="text-danger">{formik.errors.chefId}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Categoría *
          </label>
          <select
            className={`form-control ${
              formik.errors.categoryId
                ? "is-invalid"
                : !formik.errors.categoryId && formik.values.categoryId
                ? "is-valid"
                : null
            }`}
            name="categoryId"
            onChange={formik.handleChange}
            value={formik.values.categoryId}
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
          {<small className="text-danger">{formik.errors.categoryId}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            type="number"
            className={`form-control ${
              formik.errors.price
                ? "is-invalid"
                : !formik.errors.price && formik.values.price
                ? "is-valid"
                : null
            }`}
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {<small className="text-danger">{formik.errors.price}</small>}
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
            className={`form-control ${
              formik.errors.description
                ? "is-invalid"
                : !formik.errors.description && formik.values.description
                ? "is-valid"
                : null
            }`}
            name="description"
            style={{ resize: "none" }}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
          {<small className="text-danger">{formik.errors.description}</small>}
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
          <label htmlFor="">Imagenes</label>
          <div className="d-flex align-items-center justify-content-around">
          <CourseAddImage file={formik.values.image_1} setFieldValue={formik.setFieldValue} name={'image_1'} main={true}/>
          <CourseAddImage file={formik.values.image_2} setFieldValue={formik.setFieldValue} name={'image_2'} main={false}/>
          <CourseAddImage file={formik.values.image_3} setFieldValue={formik.setFieldValue} name={'image_3'} main={false}/>
          </div>
        </div>
        <div className="col-12 mb-3">
        <hr />

          <div className="d-flex align-items-center justify-content-end">
           
            <button className="btn btn-dark mx-2 " onClick={formik.handleReset}>
              Limpiar
            </button>
            <button className="btn btn-primary mx-2" type="submit">
              Guardar
            </button>
          </div>
        </div>

        <div className="col-12"></div>
      </form>
    </>
  );
};

CourseAdd.propTypes = {
  handleAdd : PropTypes.func
};

