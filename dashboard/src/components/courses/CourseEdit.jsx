import {useFormik} from 'formik'
import { useEffect, useState } from 'react';
import { UseFetch } from '../../hooks/UseFetch';
import validate from '../../validations/courseAddValidator';
import PropTypes from 'prop-types'
import { CourseEditImage } from './CourseEditImage';

export const CourseEdit = ({handleEdit, editCourse, handleUpdate}) => {

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

      const {
        title,
        chefId,
        categoryId,
        price,
        discount,
        description,
        free,
        visible,
        images : [image_1, image_2, image_3]

      } = editCourse

    const formik = useFormik({
        initialValues: {
            title,
            chefId,
            categoryId,
            price,
            discount,
            description,
            free,
            visible,
            image_1 :image_1 ? image_1.urlImage : null,
            image_2 : image_2 ? image_2.urlImage : null,
            image_3: image_3  ? image_3.urlImage : null,
            image_1_id :image_1 ? image_1.id : null,
            image_2_id : image_2 ? image_2.id : null,
            image_3_id: image_3  ? image_3.id : null,
          },
          validate,
          onSubmit : (values) => {
            let data = new FormData();
            for (const key in values) {
                data.append(key, values[key]);
              }
              handleUpdate(data);
          }
    })

    useEffect(() => {

        const fields = [
            "title",
            "chefId",
            "categoryId",
            "price",
            "discount",
            "description",
            "free",
            "visible",
        ]

        fields.forEach(field => {
            formik.setFieldValue(field, editCourse[field],false)
        });

        formik.setFieldValue("image_1",image_1 ? image_1.urlImage : null);
        formik.setFieldValue("image_2",image_2 ? image_2.urlImage : null);
        formik.setFieldValue("image_3",image_3 ? image_3.urlImage : null);
        formik.setFieldValue("image_1_id",image_1 ? image_1.id : null);
        formik.setFieldValue("image_2_id",image_2 ? image_2.id : null);
        formik.setFieldValue("image_3_id",image_3 ? image_3.id : null);
        
    }, [editCourse]);
  return (
    <>
    <div className="d-flex justify-content-between">
      <h4>Editar Curso </h4>
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
          <CourseEditImage
            file={formik.values.image_1}
            setFieldValue={formik.setFieldValue}
            name={"image_1"}
            main={true}
          />
          <CourseEditImage
            file={formik.values.image_2}
            setFieldValue={formik.setFieldValue}
            name={"image_2"}
            main={false}
          />
          <CourseEditImage
            file={formik.values.image_3}
            setFieldValue={formik.setFieldValue}
            name={"image_3"}
            main={false}
          />
        </div>
      </div>
      <div className="col-12 mb-3">
      <hr />

        <div className="d-flex align-items-center justify-content-end">
         
          <button type='button' className="btn btn-dark mx-2 " onClick={()=>handleEdit(null)}>
            Cancelar
          </button>
          <button className="btn btn-primary mx-2" type="submit">
            Guardar
          </button>
        </div>
      </div>

      <div className="col-12"></div>
    </form>
  </>
  )
}

CourseEdit.propTypes = {
    handleEdit : PropTypes.func,
    editCourse : PropTypes.object,
    handleUpdate : PropTypes.func
}
