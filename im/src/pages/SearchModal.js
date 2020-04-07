'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from '@ant-design/react-native';

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: '',
    };
  }

  closeModal() {
    this.props.closeModal();
  }

  onChange = (search) => {
    this.setState({search});
  };
  clear = () => {
    this.setState({search: ''});
  };

  render() {
    const {search} = this.state;

    return (
      <Modal
        style={styles.container}
        animationType={'slide'}
        onRequestClose={() => {}}
        visible={this.props.modalVisible}>
        <SearchBar
          value={search}
          placeholder="搜索"
          onSubmit={(search) => Alert.alert(search)}
          onCancel={this.clear}
          onChange={this.onChange}
          showCancelButton
          cancelText="取消"
        />
        <ScrollView style={styles.scrollView}>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                搜索指定内容
              </Text>
            </View>
            <View style={styles.tagsBox}>
              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>朋友圈</Text>
              </TouchableOpacity>
              <View style={styles.tagSeprator} />

              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>文章</Text>
              </TouchableOpacity>
              <View style={styles.tagSeprator} />

              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>公众号</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagsBox}>
              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>小程序</Text>
              </TouchableOpacity>
              <View style={styles.tagSeprator} />

              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>音乐</Text>
              </TouchableOpacity>

              <View style={styles.tagSeprator} />
              <TouchableOpacity style={styles.tagBox}>
                <Text style={styles.tagTxt}>表情</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#f3f3f3',
  },
  tagsBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingBottom: 15,
  },
  tagBox: {
    width: 60,
  },
  tagTxt: {
    fontSize: 16,
    color: 'blue',
  },
  tagSeprator: {
    width: 1,
    backgroundColor: '#444',
  },
});

export default SearchModal;
