const $ = (el) => document.querySelector(el);
const cardContainer = $("#card-container");
const clearCart = $("#clear-cart");
const showTotal = $("#show-total");
const btnBuy = $("#btn-buy");
const SERVER_URL = "https://kitchening-rii9.onrender.com";

const pintarTotal = (n) => {
  n$ = n
    ? n.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
    : 0;
  showTotal.textContent = n$;
};

clearCart.addEventListener("click", async () => {
  Swal.fire({
    title: "¿Estas seguro de vaciar el carrito?",
    showCancelButton: true,
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { ok } = await fetch(`${SERVER_URL}/api/cart/clear`, {
        method: "POST",
      }).then((res) => res.json());
      ok ? pintarProducts([]) : null;
      ok ? pintarTotal(0) : null;
    }
  });
});

const pintarProducts = (products) => {
  cardContainer.innerHTML = "";
  console.log("products", products);
  products.length &&
    products?.forEach(
      ({ id, price, discount, title, description, images, Cart }) => {
        const priceCalc = discount ? price - (price * discount) / 100 : price;
        const template = `
    <div class="card my-5">
    <div class="card-body row">
      <img class="col-4" style="object-fit: contain;"
        src="/images/courses/${images[0].name}">
        <div class="col-8">
        
      <button onclick="removeProductFromCart(${id})" class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger"
        style="top:3px;right:10px"><i style="padding:2px"
          class="rounded-circle btn-clear far fa-times-circle"></i></button>

        <h5 class="card-title">${title}</h5>
        <p class="card-text text-truncate">${description}</p>
        <p class="card-text text-success">${priceCalc} ${
          discount ? `<small>${discount}%OFF</small>` : ""
        }</p>
        <p class="d-flex align-items-center gap-2">
          <button onclick="lessQuantity(${id})" class="btn btn-light">-</button>
          <output style="width:50px" class="form-control text-center">
            ${Cart.quantity}
          </output>
          <button class="btn btn-light" onclick="moreQuantity(${id})">+</button>
          <a href="/courses/detail/${id}" class="btn btn-outline-dark">Ver más</a>
        </p>
        </div>
      </div>

    </div>
  </div>
    `;
        cardContainer.innerHTML += template;
      }
    );
};

const getOrder = async () => {
  const res = await fetch(`${SERVER_URL}/api/cart/getOrderPending`, {
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

window.addEventListener("load", async () => {
  try {
    const {
      ok,
      data: { total, cart },
    } = await getOrder();
    console.log({ total, cart });
    ok ? pintarProducts(cart) : null;
    ok ? pintarTotal(total) : null;
  } catch (error) {
    console.log(error);
  }
});

const removeProductFromCart = async (courseId) => {
  try {
    Swal.fire({
      title: "¿Estas seguro de eliminar del carrito este producto?",
      showCancelButton: true,
      confirmButtonText: "Quitar",
      CancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${SERVER_URL}/api/cart/remove`, {
          method: "POST",
          body: JSON.stringify({
            courseId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { ok } = await res.json();

        const {
          data: { cart, total },
        } = await getOrder();

        Swal.fire({
          title: ok ? "Producto eliminado" : "Upss ocurrió un error",
          icon: ok ? "success" : "warning",
          timer: 1000,
          showConfirmButton: false,
        });
        pintarProducts(cart);
        pintarTotal(total);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const moreQuantity = async (courseId) => {
  try {
    await fetch(`${SERVER_URL}/api/cart/more`, {
      method: "POST",
      body: JSON.stringify({
        courseId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {
      ok,
      data: { cart, total },
    } = await getOrder();
    ok ? pintarProducts(cart) : null;
    ok ? pintarTotal(total) : null;
  } catch (error) {
    console.log(error);
  }
};

const lessQuantity = async (courseId) => {
  try {
    await fetch(`${SERVER_URL}/api/cart/less`, {
      method: "POST",
      body: JSON.stringify({
        courseId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {
      ok,
      data: { cart, total },
    } = await getOrder();
    ok ? pintarProducts(cart) : null;
    ok ? pintarTotal(total) : null;
  } catch (error) {
    console.log(error);
  }
};

btnBuy.addEventListener("click", async () => {
  Swal.fire({
    title: "¿Quieres concretar la orden?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval;
      Swal.fire({
        title: "¿Completando la venta?",
        text: "Espere mientras se procesa la venta",
        timer: 6000,
        timerProgressBar: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar proceso",
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 200);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then(async (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          const res = await fetch(`${SERVER_URL}/api/cart/status`, {
            method: "POST",
            body: JSON.stringify({
              statusOrder: "completed",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { ok } = await res.json();

          Swal.fire({
            title: ok
              ? "Gracias por su compra"
              : "Hubo un problema en la compra",
            icon: ok ? "success" : "error",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            location.href = "/";
          });
        }
      });
    }
  });
});
