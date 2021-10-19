import React, { useState } from 'react'
import { Animated, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import dataGeo from '../data/dataGeo'
import { COLORS, SIZES } from "../constants"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from '@expo/vector-icons';
import { db, auth } from '../firebase';

const Quiz = ({navigation}) => {

    const [questionsIndex, setQuestionsIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [quizName, setQuizName] = useState("Geography");


    const validateAnswer = (selectedOption) => {
        let correct_option = dataGeo[questionsIndex]["correct_option"];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            setScore(score + 1);
        }
        setShowNextButton(true);
    }

    const handleNext = () => {
        if(questionsIndex == dataGeo.length-1){
            setShowScoreModal(true);
        } else {
            setQuestionsIndex(questionsIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: questionsIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const restartQuiz = () => {
        setShowScoreModal(false);

        setQuestionsIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();

        db.collection("users").doc(auth.currentUser.uid).collection("history").add({
            number: score,
            quizName: quizName
        })

        navigation.navigate("Home")
    }

    const renderQuestion = () => {
        return (
            <View>
                <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                    <Text style={{fontSize: 20, color: COLORS.white, opacity: 0.6, marginRight: 2}}>{questionsIndex + 1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {dataGeo.length}</Text>
                </View>
                <Text style={{fontSize: 30, color: COLORS.white}}>{dataGeo[questionsIndex].question}</Text>
            </View>
        )
    }

    const renderOptions = () => {
        return (
            <View style={{marginTop: 20}}>
                {
                    dataGeo[questionsIndex].options.map((option) => (
                        <TouchableOpacity 
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? COLORS.success
                            : option==currentOptionSelected 
                            ? COLORS.error 
                            : COLORS.secondary+'40',
                            backgroundColor: option==correctOption 
                            ? COLORS.success +'20'
                            : option==currentOptionSelected 
                            ? COLORS.error +'20'
                            : COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}>
                            <Text style={{color: COLORS.white, fontSize: 20}}>{option}</Text>

                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const renderNextButton = () => {
        if(showNextButton) {
            return (
                <TouchableOpacity onPress={handleNext} style={{marginTop: 20, width: "100%", backgroundColor: COLORS.accent, padding: 20, borderRadius: 5}}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: "center"}}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, dataGeo.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',
                marginTop: 10,

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: "#254A2F"}}>
            <StatusBar barStyle="light-content" />
            <View style={{paddingVertical: 50, paddingHorizontal: 30,}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="back" size={24} color="white" />
                </TouchableOpacity>
                

                {renderProgressBar()}
                
                {renderQuestion()}

                {renderOptions()}

                {renderNextButton()}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: "90%",
                            borderRadius: 20,
                            padding: 20,
                            alignItems: "center"
                        }}>
                            <Text style={{fontSize: 30, fontWeight: "bold"}}> {score > (dataGeo.length/2) ? "Congratz" : "Ooopsss"} </Text>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score> (dataGeo.length/2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {data.length}</Text>
                            </View>
                            
                            <TouchableOpacity
                            onPress={restartQuiz}
                            style={{
                                backgroundColor: COLORS.accent,
                                padding: 20, width: "100%", borderRadius: 20
                            }}>
                                <Text style={{
                                    textAlign: "center", color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>


            </View>
            
            
        </View>
    )
}

export default Quiz

const styles = StyleSheet.create({})
