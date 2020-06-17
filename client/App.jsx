import React from 'react';
import ReactDom from 'react-dom';
import AlbumList from './components/AlbumList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <AlbumList type={'album'}/>
        <AlbumList type={'single or EP'}/>
        {/* fix the single or EP type thing to take either of the types */}
        <AlbumList type={'collection'}/>
        <AlbumList type={'appears on'}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));