import { useEffect, useState } from "react";
import { CourseAdd } from "../components/courses/CourseAdd";
import { CoursesTable } from "../components/courses/CoursesTable";
import { UseFetch } from "../hooks/UseFetch";
import { CourseEdit } from "../components/courses/CourseEdit";

export const Courses = () => {
  const [state, setState] = useState({
    loading: true,
    courses: [],
    pages: null,
    currentPage: null,
  });

  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    UseFetch("/courses?withPagination=true")
      .then(({ ok, data }) => {
        ok &&
          setState({
            loading: false,
            courses: data.courses,
            pages: data.pages,
            currentPage: data.currentPage,
          });
      })
      .catch(() => console.error);
  }, []);

  const handleGetPage = (page) => {
    UseFetch(`/courses?withPagination=true&page=${page}`)
      .then(({ ok, data }) => {
        ok &&
          setState({
            loading: false,
            courses: data.courses,
            pages: data.pages,
            currentPage: data.currentPage,
          });
      })
      .catch(() => console.error);
  };

  const handleAdd = (formdata) => {
    UseFetch("/courses", "POST", formdata).then(({ ok }) => {
      ok && handleGetPage(state.pages);
    });
  };

  const handleEdit = (id) => {
    id
      ? UseFetch(`/courses/${id}`)
          .then(({ ok, data }) => {
            ok && setEditCourse(data.course);
          })
          .catch(() => console.error)
      : setEditCourse(null);
  };

  const handleUpdate = (formdata) => {
    UseFetch(`/courses/${editCourse.id}`,'PATCH',formdata)
      .then(({ok}) => {
        if(ok){
        setEditCourse(null)
        handleGetPage(state.currentPage)
        }
      })
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-lg-7">
              <CoursesTable
                courses={state.courses}
                pages={state.pages}
                currentPage={state.currentPage}
                handleGetPage={handleGetPage}
                handleEdit={handleEdit}
              />
            </div>
            <div className="col-12 col-lg-5">
              {editCourse ? (
                <CourseEdit handleEdit={handleEdit} editCourse={editCourse} handleUpdate={handleUpdate}/>
              ) : (
                <CourseAdd handleAdd={handleAdd} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
