
const validate = (values) => {
    const errors = {};
    if(!values.title){
      errors.title = "El título es requerido"
    }
  
    if(!values.chefId){
      errors.chefId = "Debe elegir un chef"
    }
  
    if(!values.categoryId){
      errors.categoryId = "Debe elegir una categoría"
    }
    if(!values.price || values.price < 1){
      errors.price = "El precio es requerido"
    }
    if(!values.description){
      errors.description = "La descripción es requerida"
    }
  
    return errors
  }
  
  
  export default validate