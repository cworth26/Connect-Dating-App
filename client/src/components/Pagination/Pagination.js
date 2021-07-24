import React from 'react'

const Pagination = () => {
    return (
<>
        <div class="col-12 text-center mt-4 mt-sm-5">
          <ul class="pagination justify-content-center mb-0">
            <li class="page-item disabled">
              {" "}
              <span class="page-link">Prev</span>{" "}
            </li>
            <li class="page-item active" aria-current="page">
              <span class="page-link">1 </span>{" "}
              <span class="sr-only">(current)</span>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                ...
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                25
              </a>
            </li>
            <li class="page-item">
              {" "}
              <a class="page-link" href="#">
                Next
              </a>{" "}
            </li>
          </ul>
        </div>
</>
    )
}

export default Pagination;