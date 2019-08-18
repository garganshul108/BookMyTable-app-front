import React, { Component } from "react";
import { getRestaurantsByCity } from "../services/restaurantServices";
import RestaurantsFilter from "./subComponents/restaurantsFilter";
import RestaurantsCatalogue from "./subComponents/restaurantsCatalogue";
import SideAds from "./subComponents/sideAds";

import "./css/restaurants.css";
import SearchBox from "./subComponents/searchBox";
// import MyMap from "./subComponents/myMap";
import { captialize } from "../util/util";
import { Link } from "react-router-dom";

class Restaurants extends Component {
  state = {
    restaurants: [],
    seachQuery: "",
    filters: [],
    no_of_filter: "0",
    pagination: {
      pageSize: 0,
      currentPage: 1,
      pageCount: 1
    }
  };

  async componentDidMount() {
    let restaurants = await getRestaurantsByCity(this.props.match.params.city);
    for (let restaurant of restaurants) {
      restaurant.showPhone = false;
      restaurant.showMenu = false;
    }
    // console.log(restaurants);

    let pagination = {
      pageSize: 6,
      currentPage: 1
    };

    let counting = restaurants.length;
    pagination.pageCount = Math.ceil(counting / pagination.pageSize);

    this.setState({ restaurants, pagination }, () => {
      console.log(this.state);
    });
  }

  handleSearchRestaurant = query => {
    this.setState({ seachQuery: query });
  };

  handleDeleteFilter = targetFilter => {
    let { filters } = this.state;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].id === targetFilter.id) {
        filters.splice(i, 1);
        break;
      }
    }
    let updatedNoOfFilters = (parseInt(this.state.no_of_filter) - 1).toString();
    this.setState({ filters, no_of_filter: updatedNoOfFilters });
  };

  handleAddFilter = newFilter => {
    // if (this.state.seachQuery) this.setState({ seachQuery: "" });
    let { filters } = this.state;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].id === newFilter.id) {
        return;
      }
    }
    let updatedNoOfFilters = (parseInt(this.state.no_of_filter) + 1).toString();

    filters.push(newFilter);
    this.setState(
      { filters, no_of_filter: updatedNoOfFilters, seachQuery: "" },
      () => {
        console.log("fomr res", this.state);
      }
    );
  };

  filterByNameSearch = restaurants => {
    if (this.state.seachQuery)
      restaurants = restaurants.filter(restaurant => {
        let nameLiterals = restaurant.name.split(" ");
        let searchLiters = this.state.seachQuery.split(" ");
        // console.log("name:", nameLiterals);
        // console.log("seach:", searchLiters);
        for (let search of searchLiters) {
          for (let literal of nameLiterals) {
            if (
              search &&
              literal &&
              literal.toLowerCase().startsWith(search.toLowerCase())
            )
              return true;
          }
        }
        return false;
      });

    return restaurants;
  };

  filterByFilterTypes = () => {
    let { restaurants } = this.state;
    if (!restaurants[0]) return restaurants;
    console.log("filtering");
    const { filters } = this.state;
    let sample = restaurants[0];
    let left = restaurants;
    let filtered = [];
    for (let { targetProperty, expectedValue } of filters) {
      console.log("target: ", targetProperty, "ex: ", expectedValue);
      if (Array.isArray(sample[targetProperty])) {
        console.log("filtering from array");
        let filteredTop = filtered.filter(restaurant =>
          restaurant[targetProperty].includes(expectedValue)
        );
        let filteredBottom = filtered.filter(
          restaurant => !restaurant[targetProperty].includes(expectedValue)
        );
        filtered = [
          ...filteredTop,
          ...filteredBottom,
          ...left.filter(restaurant =>
            restaurant[targetProperty].includes(expectedValue)
          )
        ];
        left = left.filter(
          restaurant => !restaurant[targetProperty].includes(expectedValue)
        );
      }
    }
    return filtered.length > 0 ? filtered : restaurants;
  };

  paginate = restaurants => {
    let { pageSize, currentPage } = this.state.pagination;
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(pageSize + startIndex, restaurants.length);
    restaurants = restaurants.slice(startIndex, endIndex);
    return restaurants;
  };

  render() {
    /***
     * this is the point where data as restaurants
     * is passed onto the renderer
     *
     * without filtering this is passed on to same as this.state (full data)
     */
    let { restaurants } = this.state;
    if (parseInt(this.state.no_of_filter) > 0) {
      restaurants = this.filterByFilterTypes();
    }

    restaurants = this.filterByNameSearch(restaurants);
    let totalCount = restaurants.length;
    restaurants = this.paginate(restaurants);

    return (
      <div className="container">
        <div className="row">
          <div className="dummy" />
        </div>
        <h3 style={{ fontWeight: 900 }}>
          Places available in {captialize(this.props.match.params.city)} :{" "}
          {totalCount}
        </h3>

        <div className="row no-gutters" style={{ marginBottom: "150px" }}>
          <div className="col-2">
            <RestaurantsFilter
              city={this.props.match.params.city}
              deleteFilter={this.handleDeleteFilter}
              addFilter={this.handleAddFilter}
            />
          </div>
          <div className="col">
            {/* this is the Restaurant Catalog Display */}
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <SearchBox
                    placeholder="Find by Name"
                    idForLabel="searchName"
                    value={this.state.seachQuery}
                    onChange={this.handleSearchRestaurant}
                  />
                </div>
                <div className="col-2">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={
                          this.state.pagination.currentPage < 2
                            ? "page-item disabled"
                            : "page-item"
                        }
                      >
                        <Link
                          className={
                            this.state.pagination.currentPage < 2
                              ? "page-link"
                              : "page-link text-danger"
                          }
                          aria-label="Previous"
                          onClick={() => {
                            let { pagination } = this.state;
                            if (pagination.currentPage < 2) return;
                            pagination.currentPage = pagination.currentPage - 1;
                            this.setState({ pagination });
                          }}
                        >
                          <span aria-hidden="true">
                            <i className="fa fa-chevron-left" />
                          </span>
                        </Link>
                      </li>
                      <li
                        className={
                          this.state.pagination.currentPage >
                          this.state.pagination.pageCount - 1
                            ? "page-item disabled"
                            : "page-item"
                        }
                      >
                        <Link
                          className={
                            this.state.pagination.currentPage >
                            this.state.pagination.pageCount - 1
                              ? "page-link"
                              : "page-link  text-danger"
                          }
                          aria-label="Next"
                          onClick={() => {
                            let { pagination } = this.state;
                            if (
                              pagination.currentPage >
                              pagination.pageCount - 1
                            )
                              return;
                            pagination.currentPage = pagination.currentPage + 1;
                            this.setState({ pagination });
                          }}
                        >
                          <span aria-hidden="true">
                            <i className="fa fa-chevron-right" />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {(parseInt(this.state.no_of_filter) > 0 ||
                this.state.seachQuery) && (
                <div className="filterDisplay">
                  {this.state.seachQuery && (
                    <button
                      className="deleteFBtn badge badge-danger btn-danger btn-outline-danger"
                      onClick={e => {
                        this.setState({ seachQuery: "" });
                      }}
                    >
                      {this.state.seachQuery}&nbsp;
                      <i className="fa fa-times" aria-hidden="true" />
                    </button>
                  )}
                  {this.state.filters.map(filter => (
                    <button
                      className={
                        filter.colorClass
                          ? "deleteFBtn badge badge-" +
                            filter.colorClass +
                            " btn-" +
                            filter.colorClass +
                            " btn-outline-" +
                            filter.colorClass
                          : "deleteFBtn badge badge-default btn-dark btn-outline-dark"
                      }
                      onClick={e => this.handleDeleteFilter(filter)}
                    >
                      {filter.expectedValue}&nbsp;
                      <i className="fa fa-window-close" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <RestaurantsCatalogue restaurants={restaurants} />
            {/* Pagination */}

            {/* Pagination end */}
            {/* end of display catalogue */}
          </div>
          <div className="col-3">
            {/* <MyMap /> */}
            <SideAds />
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurants;
