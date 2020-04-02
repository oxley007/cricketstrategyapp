import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';

class DisplayScorecard extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    state = {
      gameID: this.props.gameID.gameID || '0',
    };

    handleChange = ( gameID ) => {
      this.setState({ gameID });
    };

    getScorecard() {
      console.log(this.props.gameId);
      console.log(this.props.title);
      if (this.props.gameId === this.props.gameID.gameID) {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 4 }}>
                      <Text>{this.props.title}</Text>
                  </View>
                  <View style={{ flex: 4 }}>
                      <Text>{this.props.runs}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      {this.props.complete && (
                          <Text>COMPLETE</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
      }
      else {
        //do not display anyting.
      }
    }

    render() {
        return (
          <View>
            {this.getScorecard()}
          </View>
        );
    }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
});

export default connect(mapStateToProps)(DisplayScorecard);
