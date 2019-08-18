import React, { Component } from "react";
import RestaurantDisplay from "./restaurantDisplay";

class RestaurantsCatalogue extends Component {
  /***
   * Display Handlers : controlling events
   *
   */
  handleCall = restaurant => {
    console.log("call clicked");
    let uRestaurants = this.props.restaurants;
    let targetRestaurant = uRestaurants[uRestaurants.indexOf(restaurant)];
    targetRestaurant.showPhone = !targetRestaurant.showPhone;
    this.setState({ restaurants: uRestaurants });
  };

  handleMenu = restaurant => {
    console.log("menu clicked");
    let uRestaurants = this.props.restaurants;
    let targetRestaurant = uRestaurants[uRestaurants.indexOf(restaurant)];
    targetRestaurant.showMenu = !targetRestaurant.showMenu;
    this.setState({ restaurants: uRestaurants });
  };

  showAvailableTables = restaurant => {
    console.log("Book Table clicked");
    let uRestaurants = this.props.restaurants;
    let targetRestaurant = uRestaurants[uRestaurants.indexOf(restaurant)];
    targetRestaurant.showTables = !targetRestaurant.showTables;
    this.setState({ restaurants: uRestaurants });
  };

  /***
   * controlling events section end
   */

  render() {
    const { restaurants } = this.props;
    return (
      <div className="container-fluid restaurantCatalog">
        {restaurants.map(restaurant => {
          return (
            <RestaurantDisplay
              onMenu={this.handleMenu}
              onCall={this.handleCall}
              restaurant={restaurant}
              showAvailableTables={this.showAvailableTables}
            />
          );
        })}
      </div>
    );
  }
}

export default RestaurantsCatalogue;
