window.addCourseToCart = async (courseId) => {
  try {
    const res = await fetch(`https://kitchening-rii9.onrender.com/api/cart/add`, {
      method: "POST",
      body: JSON.stringify({
        courseId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { ok } = await res.json();

    if (!ok) {
      return (location.href = "/users/login");
    }
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 800,
    });
  } catch (error) {
    console.log("error");
  }
};
