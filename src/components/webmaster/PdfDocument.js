import React from "react";
import { Page, Text, View, Document, Image, Link, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#f6f6f5",
        padding: 10
    },
    reviewHeader: {
        width: "100%",
        padding: 10,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: "#157a6e"
    },
    reviewHeaderImage: {
        height: 38,
        width: 90
    },
    reviewHeaderContact: {
        color: "white",
        fontSize: 11
    },
    reviewTitle: {
        textAlign: "center",
        textTransform: "uppercase",
        color: "#6c757d",
        margin: 10
    },
    reviewContainer: {
        backgroundColor: "#ffffff",
        padding: 5
    },
    questionText: {
        fontSize: 13,
        marginBottom: 10,
        fontWeight: "900"
    }

});

const PdfDocument = ({ review }) => (

    <Document>
        <Page style={styles.page}>

            <View style={styles.reviewHeader}>
                <Image source="https://quizblogbucket.s3.us-east-2.amazonaws.com/quizLogo.jpg" style={styles.reviewHeaderImage} />
                <View style={styles.reviewHeaderContact}>

                    <Text>
                        <Text style={{ color: "#ffffff" }}>
                            Website:</Text>
                        <Link src="http://www.quizblog.rw" style={{ color: "#ffc107", textDecoration: "none" }}> http://www.quizblog.rw</Link>
                    </Text>
                    <Text>
                        <Text style={{ color: "#ffffff" }}>
                            Email:</Text>
                        <Link src="quizblog.rw@gmail.com" style={{ color: "#ffc107", textDecoration: "none" }}> quizblog.rw@gmail.com</Link>
                    </Text>
                    <Text style={{ color: "#ffc107" }}>
                        <Text style={{ color: "#ffffff" }}>Phone:</Text> 0780579067
                    </Text>

                </View>
            </View>

            <View>
                <Text style={styles.reviewTitle}>{review.title}</Text>
            </View>

            {review ?
                review.questions.map((question, index) => {
                    return (
                        <View key={index} style={styles.reviewContainer}>

                            <Text style={styles.questionText}>Q{index + 1}. {question.questionText}</Text>

                            {question.answerOptions.map((answer, index) =>
                                <View key={index} style={{
                                    fontSize: 12,
                                    marginBottom: 12,
                                    color: answer.isCorrect ? "#157a6e" : !answer.isCorrect && answer.choosen ? "red" : "#6c757d"
                                }}>
                                    <View key={index}>
                                        <Text>{index + 1}. {answer.answerText}</Text>
                                        {answer.explanations ?
                                            <Text style={{ fontSize: "9px", marginTop: 6 }}>{answer.explanations}</Text> : null}
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })
                : ""}
        </Page>
    </Document>
);

export default PdfDocument