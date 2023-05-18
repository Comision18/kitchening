new Glider(document.querySelector(".glider"), {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
  responsive: [
    {
      // screens greater than >= 768px
      breakpoint: 768,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 3,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25,
      },
    },
  ],
});

const addCourseToCart = async (courseId) => {
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
    console.log(error);
  }
};