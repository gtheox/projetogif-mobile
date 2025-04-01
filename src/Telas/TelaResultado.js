import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Dimensions, FlatList, ImageBackground, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Error from '../Components/Error';
import Loading from '../Components/Loading';
import TextoInfo from '../Components/TextoInfo';

import axios from 'axios';
import API_KEY from '../API_KEY';
import Cabecalho from '../Components/Cabecalho';
const { width, height } = Dimensions.get("window")
const IMAGE_WIDTH = width


export default function TelaResultado({ route, navigation }) {
  const escolha = route.params.escolha
  const link = `http://api.giphy.com/v1/${escolha}/search`

  const [text, setText] = useState('')
  const [dados, setDados] = useState([])
  const [showMessage, setShowMessage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const solicitarDados = async (text) => {
    Keyboard.dismiss()
    setIsLoading(true)
    try {
      const resultado = await axios.get(link, {
        params: {
          api_key: API_KEY,
          q: text
        }
      })
      setShowMessage(false)
      setIsLoading(false)
      setDados(resultado.data.data)
    } catch (err) {
      setIsLoading(false)
      setShowMessage(false)
      setShowError(true)
      console.log(err)
      Alert.alert("Alerta", "Estamos com error")
    }

  }

  return (
    <ImageBackground
      source={require('../../assets/BG.png')}
      style={styles.container}
    >
      <Cabecalho
        text={text}
        setText={setText}
        navigation={navigation}
        solicitarDados={solicitarDados}
      />


      <FlatList
        data={dados}
        numColumns={2}
        ListHeaderComponent={
          <>
            <Loading isLoading={isLoading} />
            <TextoInfo showMessage={showMessage} />
            <Error showError={showError} />
          </>
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("TelaDetalhes", { item: item })}>
              <Image
                style={styles.image}
                source={{ uri: item.images.preview_gif.url }} />
            </TouchableOpacity>

          )
        }}
      />


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: IMAGE_WIDTH / 2.3,
    height: IMAGE_WIDTH / 2.3,
    margin: IMAGE_WIDTH * 0.03,
    borderRadius: 10
  }
});
