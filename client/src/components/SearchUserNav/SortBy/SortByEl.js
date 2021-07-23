import React from 'react';
import "./sortbyel.css";

function SortBy() {
    return (

            <div class="job-sortby">
              <form class="form-inline">

                  <label class="mr-2" id="sort-by-text">Sort by :</label>
                  <span class="sort-by" id="sort-by-input">
                    <select
                      class="form-control basic-select select2-hidden-accessible"
                      data-select2-id="1"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <option data-select2-id="3">Newest</option>
                      <option>Oldest</option>
                    </select>
                  </span>

              </form>
            </div>

    )
}

export default SortBy
