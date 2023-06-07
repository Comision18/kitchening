import { CourseRow } from "./CoursesRow";
import PropTypes from "prop-types";

export const CoursesTable = ({
  courses,
  pages,
  currentPage,
  handleGetPage,
  handleEdit,
  handleDelete,
}) => {
  const paginator = [];
  for (let i = 1; i <= pages; i++) {
    paginator.push(i);
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Lista de productos</h4>
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-sm">
            {currentPage != 1 && (
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handleGetPage(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            )}

            {paginator.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage && "active"}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handleGetPage(page)}
                >
                  {page}
                </a>
              </li>
            ))}

            {currentPage != pages && (
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handleGetPage(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <hr />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Chef</th>
              <th scope="col">Precio</th>
              <th scope="col">Desc</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <CourseRow
                key={index}
                {...course}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
CoursesTable.propTypes = {
  courses: PropTypes.array,
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  handleGetPage: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete : PropTypes.func
};
