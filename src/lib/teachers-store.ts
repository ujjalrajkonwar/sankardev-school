"use client";

import { useState, useEffect } from "react";

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  category: string;
  photoUrl: string;
};

const DEFAULT_CATEGORIES = [
  "all", "math", "science", "social science", "assamese", 
  "english", "sanskrit", "art", "geography", "hindi", 
  "advance math", "computer science", "bihu"
];

const DEFAULT_TEACHERS: Teacher[] = [
  { id: "1", name: "Sarah Williams", subject: "Science Teacher", category: "science", photoUrl: "" },
  { id: "2", name: "David Johnson", subject: "Mathematics Teacher", category: "math", photoUrl: "" },
  { id: "3", name: "Emily Brown", subject: "English Teacher", category: "english", photoUrl: "" },
  { id: "4", name: "Michael Lee", subject: "Computer Science", category: "computer science", photoUrl: "" },
];

export function useTeachersStore() {
  const [categories, setCategories] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem("sankardev_categories");
    const storedTeachers = localStorage.getItem("sankardev_teachers");

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem("sankardev_categories", JSON.stringify(DEFAULT_CATEGORIES));
    }

    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    } else {
      setTeachers(DEFAULT_TEACHERS);
      localStorage.setItem("sankardev_teachers", JSON.stringify(DEFAULT_TEACHERS));
    }
    
    setIsLoaded(true);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sankardev_categories") setCategories(JSON.parse(e.newValue || "[]"));
      if (e.key === "sankardev_teachers") setTeachers(JSON.parse(e.newValue || "[]"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addCategory = (category: string) => {
    const newCategory = category.toLowerCase().trim();
    if (!categories.includes(newCategory) && newCategory !== "") {
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      localStorage.setItem("sankardev_categories", JSON.stringify(newCategories));
    }
  };

  const removeCategory = (category: string) => {
    if (category === "all") return;
    const newCategories = categories.filter(c => c !== category);
    setCategories(newCategories);
    localStorage.setItem("sankardev_categories", JSON.stringify(newCategories));
  };

  const addTeacher = (teacher: Omit<Teacher, "id">) => {
    const newTeacher = { ...teacher, id: Date.now().toString() };
    const newTeachers = [...teachers, newTeacher];
    setTeachers(newTeachers);
    localStorage.setItem("sankardev_teachers", JSON.stringify(newTeachers));
  };

  const removeTeacher = (id: string) => {
    const newTeachers = teachers.filter((t) => t.id !== id);
    setTeachers(newTeachers);
    localStorage.setItem("sankardev_teachers", JSON.stringify(newTeachers));
  };

  return {
    categories,
    teachers,
    addCategory,
    removeCategory,
    addTeacher,
    removeTeacher,
    isLoaded
  };
}
