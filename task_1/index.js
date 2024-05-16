import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
  const decodedList = [];
  const uniqueIds = new Set()
  for (const item of encoded) {
    const decodedItem = {};
    for (const key in item) {
      if (key === "groupId" || key === "service" || key === "formatSize" || key === "ca") {
        decodedItem[key] = item[key];
        if (key === "groupId")
          uniqueIds.add(item.groupId)
      } else if (key.endsWith("Id")) {
        uniqueIds.add(item[key]===null?item[key]:parseInt(item[key]))
        const translationKey = parseInt(item[key]);
        decodedItem[key] = translations[translationKey] || item[key];
      }
    }
    decodedList.push(decodedItem);
  }

  return { decodedList, uniqueIds };
}

// Пример использования
const { decodedList, uniqueIds } = decodeFields(encoded, translations);
console.log("Расшифрованные поля:", decodedList);
console.log("Уникальные идентификаторы:", uniqueIds);