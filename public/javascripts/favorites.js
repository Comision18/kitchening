const cardsContainer = document.querySelector("#cards-container");
const URL_API_SERVER = "http://localhost:3000/api";

const getFavorites = () => {
  return fetch(`${URL_API_SERVER}/favorites`).then((res) => res.json());
};

const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const paintProducts = ({ products }) => {
  cardsContainer.innerHTML = "";

  if (products.length) {
    products.forEach(({ title, discount, price, id, images }) => {
      console.log(images)
      const priceWithDiscount = discount
        ? price - (price * discount) / 100
        : price;
      const priceFormatARG = convertFormatPeso(priceWithDiscount);

      const template = `
      <div class="card col-12 col-lg-6 position-relative">
              <i class="text-primary p-0 border-0 bg-transparent position-absolute fs-5 fas fa-star" style="top:15px;right:15px;cursor:pointer" onclick="toggleFavorite(${id})"></i>
        <div class="card-body d-flex gap-2 align-items-center justify-content-evenly">
          
          <img style="width:180px;height:120px" style="object-fit:contain;" src="/images/courses/${images[0].name}" alt="">
          <div class="">

            <h5 class="card-title">${title}</h5>
            <p class="card-text text-success fw-bold">${priceFormatARG} ${
        discount ? `<span class="text-danger mx-3">${discount}% OFF</span>` : ""
      }</p>
            <p class="d-flex align-items-center gap-2">
              <a href="/courses/detail/${id}" class="btn btn-outline-dark">Ver más</a>
              <button class="btn btn-success" onclick="addProductToCart(${id})">Agregar Carrito</button>
            </p>
          </div>
        </div>
        </div>
      `;

      cardsContainer.innerHTML += template;
    });
    return;
  }
  cardsContainer.innerHTML = "<h1>No existen productos favoritos</h1>";
};

window.addEventListener("load", async () => {
  try {
    const { ok, data } = await getFavorites();
    ok && paintProducts({ products: data });
  } catch (error) {
    console.log(error);
  }
});

const addProductToCart = async (id) => {
  try {
    const objCourseId = {
      courseId: id,
    };
    const { ok } = await fetch(`${URL_API_SERVER}/cart/addProduct`, {
      method: "POST",
      body: JSON.stringify(objCourseId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    await Swal.fire({
      title: ok ? "Producto agregado al carrito" : "Debes iniciar sesión",
      icon: ok ? "success" : "warning",
      showConfirmButton: false,
      timer: 1200,
    });

    !ok && (location.href = "/users/login");
  } catch (error) {
    console.log(error);
  }
};

const toggleFavorite = async (id) => {
  try {
    const result = await Swal.fire({
      title: "¿Quieres quitar el producto de favoritos?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Quitar",
    });

    if (result.isConfirmed) {
      const objCourseId = {
        courseId: id,
      };
      const { ok } = await fetch(`${URL_API_SERVER}/favorites/toggle`, {
        method: "POST",
        body: JSON.stringify(objCourseId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (ok) {
        const { ok, data } = await getFavorites();
        console.log({ ok, data })
        paintProducts({ products: data });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
