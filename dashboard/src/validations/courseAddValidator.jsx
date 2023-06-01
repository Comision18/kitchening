const validate = (values) => {
    const errors = {};

    if(!values.title) {
        errors.title = "El título es requerido"
    }

    if(!values.chef) {
        errors.chef = "Debes elegir un chef"
    }

    return errors
}

export default validate