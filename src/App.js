import React, { Component } from "react";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";
import axios from "axios";
class App extends Component {
  state = {
    authors: [],
    currentAuthor: null,
    loading: true
  };
  getAuthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = response.data;
      this.setState({ authors, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    this.getAuthors();
  }
  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      const currentAuthor = response.data;
      this.setState({ currentAuthor, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    console.log(this.state.authors);
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className="content col-10">{this.getContentView()}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
