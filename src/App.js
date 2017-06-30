import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paging from './components/Paging';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pageIndex: 1
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(pageIndex) {
    this.setState({
      pageIndex: pageIndex
    });
  }

  render() {
    return (
      <Paging
        pageIndex={this.state.pageIndex}
        totalCount="240"
        onClick={this.onClick} />
    );
  }
}

export default App;
