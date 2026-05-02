"use client";

import { useSyncExternalStore } from "react";

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  category: string;
  photoUrl: string;
};

const CATEGORIES_KEY = "sankardev_categories";
const TEACHERS_KEY = "sankardev_teachers";
const TEACHERS_EVENT = "sankardev-teachers-updated";

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

let categoriesCache = DEFAULT_CATEGORIES;
let teachersCache = DEFAULT_TEACHERS;
let cacheReady = false;

function readStorage<T>(key: string, fallback: T[]) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function loadCache() {
  if (typeof window === "undefined" || cacheReady) return;

  categoriesCache = readStorage(CATEGORIES_KEY, DEFAULT_CATEGORIES);
  teachersCache = readStorage(TEACHERS_KEY, DEFAULT_TEACHERS);
  cacheReady = true;
}

function notifyStoreChanged() {
  window.dispatchEvent(new Event(TEACHERS_EVENT));
}

function subscribe(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CATEGORIES_KEY || event.key === TEACHERS_KEY) {
      cacheReady = false;
      loadCache();
      callback();
    }
  };

  const handleLocalUpdate = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(TEACHERS_EVENT, handleLocalUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(TEACHERS_EVENT, handleLocalUpdate);
  };
}

function getCategoriesSnapshot() {
  loadCache();
  return categoriesCache;
}

function getTeachersSnapshot() {
  loadCache();
  return teachersCache;
}

function getServerCategoriesSnapshot() {
  return DEFAULT_CATEGORIES;
}

function getServerTeachersSnapshot() {
  return DEFAULT_TEACHERS;
}

export function useTeachersStore() {
  const categories = useSyncExternalStore(subscribe, getCategoriesSnapshot, getServerCategoriesSnapshot);
  const teachers = useSyncExternalStore(subscribe, getTeachersSnapshot, getServerTeachersSnapshot);

  const addCategory = (category: string) => {
    const newCategory = category.toLowerCase().trim();
    if (!categories.includes(newCategory) && newCategory !== "") {
      categoriesCache = [...categories, newCategory];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesCache));
      notifyStoreChanged();
    }
  };

  const removeCategory = (category: string) => {
    if (category === "all") return;

    categoriesCache = categories.filter(c => c !== category);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesCache));
    notifyStoreChanged();
  };

  const addTeacher = (teacher: Omit<Teacher, "id">) => {
    const newTeacher = { ...teacher, id: Date.now().toString() };

    teachersCache = [...teachers, newTeacher];
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachersCache));
    notifyStoreChanged();
  };

  const removeTeacher = (id: string) => {
    teachersCache = teachers.filter((teacher) => teacher.id !== id);
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachersCache));
    notifyStoreChanged();
  };

  return {
    categories,
    teachers,
    addCategory,
    removeCategory,
    addTeacher,
    removeTeacher,
    isLoaded: true
  };
}
