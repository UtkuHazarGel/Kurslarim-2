import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext } from "react";
import { EvilIcons } from "@expo/vector-icons";
import Courses from "../components/Courses";
import { CoursesContext } from "../store/coursesContext";
import CourseForm from "../components/CourseForm";

export default function ManageCourse({ route, navigation }) {
  const coursesContext = useContext(CoursesContext);
  const courseId = route.params?.courseId;
  let isEditing = false;
  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );
  if (courseId) {
    isEditing = true;
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Kursu Güncelle" : "Kurs Ekle",
    });
  }, [navigation, isEditing]);

  function deleteCourse() {
    coursesContext.deleteCourse(courseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function addOrUpdateHandler(courseData) {
    if (isEditing) {
      coursesContext.updateCourse(courseId, courseData);
    } else {
      coursesContext.addCourse(courseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <CourseForm
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        buttonLabel={isEditing ? "Güncelle" : "Ekle"}
        defaultValues={selectedCourse}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={deleteCourse}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  deleteContainer: {
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "blue",
    paddingTop: 10,
    marginTop: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
