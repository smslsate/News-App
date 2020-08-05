import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//Wall Street
const URL =
  'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=48a2253f2c75450d83fa090503dda16a';
//const URL = 'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=48a2253f2c75450d83fa090503dda16a';
//日本のニュース
//const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

export default HomeScreen = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              props.navigation.navigate('Article', { article: item })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};
