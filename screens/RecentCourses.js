import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Courses from "../components/Courses";
import { CoursesContext } from "../store/coursesContext";
import { getLastWeek } from "../helper/date";
import { getCourses } from "../helper/http";
useState;
export default function RecentCourses() {
  const coursesContext = useContext(CoursesContext);
  const [fetchedCourses, setFetchedCourses] = useState([]);
  useEffect(() => {
    async function takeCourses() {
      const courses = await getCourses();
      coursesContext.setCourses(courses)
      // setFetchedCourses(courses)
    }
    takeCourses();
  }, []);

  

  const recentCourses = coursesContext.courses.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);

    return course.date >= dateLastWeek && course.date <= today;
  });
  return (
    <Courses
      courses={recentCourses}
      coursesPeriod="Son Bir Hafta"
      nullText="Yakın zamanda herhangi bir kursa kaydolmadınız."
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
