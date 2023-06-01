import { useEffect, useState } from "react";
import { CourseAdd } from "../components/courses/CourseAdd";
import { CoursesTable } from "../components/courses/CoursesTable";
import { UseFetch } from "../hooks/UseFetch";

export const Courses = () => {
  const [state, setState] = useState({
    loading: true,
    courses: [],
    pages : null,
    currentPage : null
  });

  useEffect(() => {
    UseFetch('/courses?withPagination=true')
      .then(({ok, data}) => {
        ok &&
        setState({
          loading : false,
          courses : data.courses,
          pages : data.pages,
          currentPage : data.currentPage
        })
      })
      .catch(() => console.error)
  }, []);

  const handleGetPage = (page) => {
    UseFetch(`/courses?withPagination=true&page=${page}`)
    .then(({ok, data}) => {
      ok &&
      setState({
        loading : false,
        courses : data.courses,
        pages : data.pages,
        currentPage : data.currentPage
      })
    })
    .catch(() => console.error)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-7">
              <CoursesTable 
              courses = {state.courses}
              pages = {state.pages}
              currentPage = {state.currentPage}
              handleGetPage = {handleGetPage}
              />
            </div>
            <div className="col-12 col-md-5">
              <CourseAdd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
