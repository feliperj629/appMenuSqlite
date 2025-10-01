import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Home</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Cadastrar Usuario"
                    onPress={() => navigation.navigate('Cadastro')}
                />
                <Button
                    title="Consultar Usuários"
                    onPress={() => navigation.navigate('Consulta')}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Esta é a tela inicial do aplicativo.</Text>
                <Text style={styles.text}>Clique nos botões acima para navegar pelas telas.</Text>
                <Text style={styles.text}>Clique no botão de menu lateral para abrir o menu lateral.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
        fontWeight: 'bold'
    },
    textContainer: {
        flexDirection: 'column'
    }

});