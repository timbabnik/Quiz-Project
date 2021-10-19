import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import GameHistory from '../components/GameHistory'
import { auth, db } from '../firebase'

const ProfileScreen = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("history").onSnapshot((snapshot) => 
            setHistory(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe
    }, [])

    return (
        <ScrollView>
            {
                history.map(({id, data: {quizName, number}}) => {
                    return <GameHistory key={id} id={id} gameName={quizName} score={number} />
                })
            }
        </ScrollView>
        
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
